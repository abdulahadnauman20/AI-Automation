const express = require("express");
const { 
    AddLeadsToCampaign, 
    GetAllLeads, 
    GetLeadById, 
    UpdateLead, 
    DeleteLead, 
    UpdateLeadStatus, 
    SearchLeads,
    SearchLeadsByFilter
} = require("../Controller/leadController");
const { VerifyUser } = require("../Middleware/userAuth");

const router = express.Router();

router.route("/AddLeadsToCampaign").post(VerifyUser,AddLeadsToCampaign);
// Temporarily removed VerifyUser middleware for testing
router.route("/GetAllLeads").get(GetAllLeads);
router.route("/GetLead/:leadid").get(VerifyUser,GetLeadById);
router.route("/UpdateLead/:leadid").post(VerifyUser,UpdateLead);
router.route("/DeleteLead/:leadid").delete(VerifyUser,DeleteLead);
router.route("/UpdateLeadStatus/:leadid").patch(VerifyUser,UpdateLeadStatus);
router.route('/SearchLeads').post(VerifyUser,SearchLeads);
router.route('/SearchLeadsByFilter').post(VerifyUser,SearchLeadsByFilter);

module.exports = router;