const conversationCollection = require("../../model/conversation");

const getConversation = async (req, res) => {
    try {
        const sender = req.query.sender;
        const receiver = req.query.receiver;
        const filter = { sender, receiver };
        const result = await conversationCollection.findOne(filter);
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = getConversation;