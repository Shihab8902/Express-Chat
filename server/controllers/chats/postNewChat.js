const chatCollection = require("../../model/chat");

const postNewChat = async (req, res) => {
    try {
        const data = req.body;
        const user = req.query.user;

        //Check for chat existence
        const isExist = await chatCollection.findOne({ email: data.email, recipientEmail: user });
        if (isExist) {
            return res.send("Chat already exist!");
        }

        //Save the chat
        const newChat = chatCollection(data);
        await newChat.save();


        res.send("Chat saved!");

    }

    catch (error) {
        console.log(error);
    }
}


module.exports = postNewChat;