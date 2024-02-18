const router = require("express").Router();
const deleteChat = require("../../controllers/chats/deleteChat");
const getChats = require("../../controllers/chats/getChats");
const postNewChat = require("../../controllers/chats/postNewChat");
const verifyToken = require("../../middlewares/verifyToken");


//Get user specific chat
router.get("/chat", verifyToken, getChats);

//post a new chat
router.post("/chat", verifyToken, postNewChat);

//Delete a chat
router.delete("/chat", verifyToken, deleteChat);



module.exports = router;