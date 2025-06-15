const { dbConnect } = require('../Data/db.js');

// import model files here
const UserModel = require('../Model/userModel');
const WorkspaceModel = require('../Model/workspaceModel');
const MemberModel = require("../Model/memberModel.js");
const CampaignModel = require("../Model/campaignModel.js");
const LeadModel = require("../Model/leadModel.js");
const SequenceModel = require("../Model/sequenceModel.js");
const ScheduleModel = require("../Model/scheduleModel.js");
const EmailAccountModel = require("./emailAccountModel.js");
const APIModel = require("./apiModel.js");
const Calls = require('./callModel'); // Import the new Calls model
const TaskModel = require('./taskModel');
const MeetingModel = require('./meetingModel'); // Import the new Meetings model



// create relationships between models here
UserModel.hasMany(WorkspaceModel, { foreignKey: 'UserId' , sourceKey: "id" , onDelete: 'CASCADE' });
WorkspaceModel.belongsTo(UserModel, { foreignKey: 'OwnerId' , targetKey: "id" });
WorkspaceModel.hasMany(UserModel, { foreignKey: 'CurrentWorkspaceId', sourceKey: "id" , onDelete: 'CASCADE'});
UserModel.belongsTo(WorkspaceModel, { foreignKey: 'CurrentWorkspaceId', targetKey: "id" });

WorkspaceModel.hasMany(MemberModel, { foreignKey: 'WorkspaceId', onDelete: 'CASCADE' , sourceKey: "id"});
MemberModel.belongsTo(WorkspaceModel, { foreignKey: 'WorkspaceId' , targetKey: "id"});
UserModel.hasMany(MemberModel, { foreignKey: 'UserId', onDelete: 'CASCADE' , sourceKey: "id"});
MemberModel.belongsTo(UserModel, { foreignKey: 'UserId' , targetKey: "id"});

CampaignModel.hasOne(WorkspaceModel, { foreignKey: 'id', sourceKey: "WorkspaceId", onDelete: 'CASCADE' });
WorkspaceModel.belongsTo(CampaignModel, { foreignKey: 'id', targetKey: "WorkspaceId" });

CampaignModel.hasMany(LeadModel, { foreignKey: 'CampaignId', sourceKey: "id", onDelete: 'CASCADE' });
LeadModel.belongsTo(CampaignModel, { foreignKey: 'CampaignId', targetKey: "id" });

// Add Call and Lead association
Calls.belongsTo(LeadModel, { foreignKey: 'LeadId' });
LeadModel.hasMany(Calls, { foreignKey: 'LeadId' });

// Update Meeting associations
MeetingModel.belongsTo(LeadModel, { 
  foreignKey: 'LeadId',
  as: 'Lead',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

LeadModel.hasMany(MeetingModel, { 
  foreignKey: 'LeadId',
  as: 'Meetings'
});

MeetingModel.belongsTo(UserModel, { 
  foreignKey: 'HostId',
  as: 'User',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

UserModel.hasMany(MeetingModel, { 
  foreignKey: 'HostId',
  as: 'HostedMeetings'
});

CampaignModel.hasOne(SequenceModel, { foreignKey: 'CampaignId', sourceKey: "id", onDelete: 'CASCADE' });
SequenceModel.belongsTo(CampaignModel, { foreignKey: 'CampaignId', targetKey: "id" });

CampaignModel.hasOne(ScheduleModel, { foreignKey: 'CampaignId', sourceKey: "id", onDelete: 'CASCADE' });
ScheduleModel.belongsTo(CampaignModel, { foreignKey: 'CampaignId', targetKey: "id" });

EmailAccountModel.hasOne(WorkspaceModel, { foreignKey: 'id', sourceKey: "WorkspaceId", onDelete: 'CASCADE' });
WorkspaceModel.belongsTo(EmailAccountModel, { foreignKey: 'id', targetKey: "WorkspaceId" });




dbConnect().then(() => {
    console.log('Database connected and models synchronized.');
}).catch(err => {
    console.error('Error connecting database:', err);
});

module.exports = {
  User: UserModel,
  Workspace: WorkspaceModel,
  Member: MemberModel,
  Campaign: CampaignModel,
  Lead: LeadModel,
  Sequence: SequenceModel,
  Schedule: ScheduleModel,
  EmailAccount: EmailAccountModel,
  API: APIModel,
  Calls: Calls, // Export the Calls model
  Task: TaskModel,
  Meetings: MeetingModel, // Export the Meetings model
};