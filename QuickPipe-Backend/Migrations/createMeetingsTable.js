const { DataTypes } = require('sequelize');
const { sequelize } = require('../Data/db.js');

async function up() {
  try {
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS "Meetings" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "Topic" VARCHAR(255) NOT NULL,
        "MeetingDate" DATE NOT NULL,
        "MeetingTime" TIME,
        "Attendees" VARCHAR(255),
        "Meeting_Link" VARCHAR(255),
        "Notes" TEXT,
        "LeadId" UUID REFERENCES "Leads"("id") ON DELETE SET NULL,
        "HostId" UUID REFERENCES "Users"("id") ON DELETE SET NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Meetings table created successfully');
  } catch (error) {
    console.error('Error creating Meetings table:', error);
    throw error;
  }
}

async function down() {
  try {
    await sequelize.query(`DROP TABLE IF EXISTS "Meetings";`);
    console.log('Meetings table dropped successfully');
  } catch (error) {
    console.error('Error dropping Meetings table:', error);
    throw error;
  }
}

module.exports = { up, down }; 