const getConversation = require("../../controllers/conversation/getConversation");
const postAndUpdateConversation = require("../../controllers/conversation/postAndUpdateConversation");
const verifyToken = require("../../middlewares/verifyToken");

const router = require("express").Router();

router.get("/conversation", verifyToken, getConversation);

//Post a new conversation
router.post("/conversation", verifyToken, postAndUpdateConversation);


module.exports = router;