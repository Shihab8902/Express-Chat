const router = require("express").Router();
const getMessageRequest = require("../../controllers/message requests/getMessageRequest");
const postMessageRequest = require("../../controllers/message requests/postMessageRequest");
const saveMessageRequestsToContact = require("../../controllers/message requests/saveMessageRequestsToContact");
const verifyToken = require("../../middlewares/verifyToken");


//Get user specific message request
router.get("/messageRequest", verifyToken, getMessageRequest);

//Make message request to contact
router.post("/messageRequestToContact", verifyToken, saveMessageRequestsToContact);

//Post a new message request
router.post("/messageRequest", verifyToken, postMessageRequest);



module.exports = router;