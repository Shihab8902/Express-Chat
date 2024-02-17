const router = require("express").Router();
const postNewChat = require("../../controllers/chats/postNewChat");
const verifyToken = require("../../middlewares/verifyToken");

router.post("/chat", verifyToken, postNewChat);



module.exports = router;