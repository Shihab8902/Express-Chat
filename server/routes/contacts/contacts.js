const deleteContact = require("../../controllers/contact/deleteContact");
const getContact = require("../../controllers/contact/getContact");
const getContactDetails = require("../../controllers/contact/getContactDetails");
const saveContact = require("../../controllers/contact/saveContact");
const updateContact = require("../../controllers/contact/updateContact");
const verifyToken = require("../../middlewares/verifyToken");

const router = require("express").Router();



//Get user specific contact
router.get("/contact", verifyToken, getContact);

//Get contact information by email
router.get("/contact/details", verifyToken, getContactDetails);

//Save a contact
router.post("/contact", verifyToken, saveContact);

//Update a contact
router.put("/contact", verifyToken, updateContact);

//Delete a contact
router.delete("/contact", verifyToken, deleteContact);


module.exports = router;