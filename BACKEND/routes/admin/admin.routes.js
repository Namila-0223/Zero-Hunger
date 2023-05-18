const express = require("express");
const verifyJWT = require("../../middleware/verifyJWT")



const{updateDonationStatus}=require("../../controllers/admin/updateDonationStatus");
const{getAllPendingDonations}=require("../../controllers/admin/pendingDonationList");
const { getAllUsers } = require("../../controllers/admin/getAllUsers");
const { getAllAcceptedDonations } = require("../../controllers/admin/acceptedDonationList");
const { deleteDonationRequest } = require("../../controllers/admin/deleteDonationRequest");
const { rejectDonation } = require("../../controllers/admin/rejectDonation");

const router = express.Router();




router.put("/updostauts/:id",updateDonationStatus);
router.get("/getpdon/", getAllPendingDonations);
router.get("/getaccepteddon/",getAllAcceptedDonations)
router.get("/getusers",getAllUsers);
router.delete("/deletedonreq/:id",deleteDonationRequest);
router.put("/rejectdonation/:id",rejectDonation);



module.exports = router;
