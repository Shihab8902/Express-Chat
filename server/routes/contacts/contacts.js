const getContact = require("../../controllers/contact/getContact");
const saveContact = require("../../controllers/contact/saveContact");

const router = require("express").Router();



//Get user specific contact
router.get("/contact", getContact);

//Save a contact
router.post("/contact", saveContact);


module.exports = router;