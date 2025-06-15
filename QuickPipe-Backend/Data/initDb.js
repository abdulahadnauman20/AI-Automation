const { sequelize } = require('./db.js');
const { Meetings } = require('../Model/connect');

async function initializeDatabase() {
    try {
        console.log('Initializing database...');
        
        // Sync all models with the database
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully');

        // Verify Meetings table exists
        const tableExists = await sequelize.getQueryInterface().showAllTables()
            .then(tables => tables.includes('Meetings'));
        
        if (!tableExists) {
            console.log('Meetings table does not exist, creating it...');
            await Meetings.sync({ force: true });
            console.log('Meetings table created successfully');
        } else {
            console.log('Meetings table already exists');
        }

        // Add some test data if the table is empty
        const meetingCount = await Meetings.count();
        if (meetingCount === 0) {
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
                    MeetingDate: new Date(Date.now() + 86400000), // Tomorrow
                    MeetingTime: '14:00:00',
                    Meeting_Link: 'https://meet.google.com/test-link-2',
                    Notes: 'Review progress and next steps'
                }
            ]);
            console.log('Test meeting data added successfully');
        }

    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

// Run the initialization
initializeDatabase()
    .then(() => {
        console.log('Database initialization completed');
        process.exit(0);
    })
    .catch(error => {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }); 