const express = require("express");
const app = express();
const middleware = require("./Middleware/error");
const cors = require("cors");
const path = require("path");
const { connectRedis } = require('./Utils/redisUtils');
const { sequelize } = require('./Data/db.js');
const { Meetings } = require('./Model/connect');

// Initialize database
async function initializeDatabase() {
    try {
        console.log('Initializing database...');
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully');

        // Verify Meetings table exists
        const tableExists = await sequelize.getQueryInterface().showAllTables()
            .then(tables => tables.includes('Meetings'));
        
        if (!tableExists) {
            console.log('Meetings table does not exist, creating it...');
            await Meetings.sync({ force: true });
            console.log('Meetings table created successfully');

            // Add test data
            console.log('Adding test meeting data...');
            await Meetings.bulkCreate([
                {
                    Topic: 'Initial Project Discussion',
                    MeetingDate: new Date(),
                    MeetingTime: '10:00:00',
                    Meeting_Link: 'https://meet.google.com/test-link',
                    Notes: 'Discuss project requirements and timeline'
                },
                {
                    Topic: 'Follow-up Meeting',
                    MeetingDate: new Date(Date.now() + 86400000),
                    MeetingTime: '14:00:00',
                    Meeting_Link: 'https://meet.google.com/test-link-2',
                    Notes: 'Review progress and next steps'
                }
            ]);
            console.log('Test meeting data added successfully');
        } else {
            console.log('Meetings table already exists');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

// Connect to Redis
connectRedis();

// Initialize database before starting the server
initializeDatabase().catch(console.error);

app.use(cors({ 
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Special raw body parser for Stripe webhooks
const stripeWebhookPath = '/EmailAccount/StripeWebhook';
app.use((req, res, next) => {
    if (req.originalUrl === stripeWebhookPath) {
        let rawBody = '';
        req.on('data', chunk => {
            rawBody += chunk.toString();
        });
        req.on('end', () => {
            req.rawBody = rawBody;
            next();
        });
    } else {
        express.json({ limit: '50mb' })(req, res, next);
    }
});

app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

const UserRoutes = require('./Routes/userRoutes');
const ZoomRoutes = require('./Routes/zoomRoutes');
const CalendarRoutes = require('./Routes/calendarRoutes');
const WorkspaceRoutes = require("./Routes/workspaceRoutes");
const MemberRoutes = require("./Routes/memberRoutes");
const leadRoutes = require('./Routes/leadRoutes');
const campaignRoutes = require('./Routes/campaignRoutes');
const apiRoutes = require("./Routes/apiRoutes");
const helpRoutes = require("./Routes/helpRoutes");
const taskRoutes = require('./Routes/taskRoutes');
const emailAccountRoutes = require("./Routes/emailAccountRoutes");
const coldCallRoutes = require("./Routes/coldCallRoutes");
const callRoutes = require('./Routes/callRoutes');
const meetingRoutes = require('./Routes/meetingRoutes');

app.use("/user", UserRoutes);
app.use("/workspace", WorkspaceRoutes)
app.use("/zoom", ZoomRoutes);
app.use("/calendar", CalendarRoutes);
app.use("/member", MemberRoutes);
app.use('/lead', leadRoutes);
app.use('/campaign', campaignRoutes);
app.use("/integration", apiRoutes);
app.use("/help", helpRoutes);
app.use('/tasks', taskRoutes);
app.use('/EmailAccount', emailAccountRoutes);
app.use('/coldCall', coldCallRoutes);
app.use('/calls', callRoutes);
app.use('/meetings', meetingRoutes);

// Render payment page
app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(middleware);
module.exports = app;
