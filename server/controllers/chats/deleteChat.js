const { default: mongoose } = require("mongoose");
const chatCollection = require("../../model/chat");
const conversationCollection = require("../../model/conversation");

const deleteChat = async (req, res) => {
    try {
        const id = req.query.id;
        const sender = req.query.sender;
        const receiver = req.query.receiver;
        const result = await chatCollection.deleteOne({ _id: new mongoose.Types.ObjectId(id) });

        if (result) {
            //Delete conversation
            await conversationCollection.deleteOne({ sender, receiver });
            return res.send({ message: "success" });
        }

        res.send(result);

    }
    catch (error) {
        console.log(error);
    }
}



module.exports = deleteChat;