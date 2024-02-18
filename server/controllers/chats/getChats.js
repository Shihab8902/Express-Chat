const chatCollection = require("../../model/chat");

const getChats = async (req, res) => {
    try {
        const email = req.query.email;
        const result = await chatCollection.find({ recipientEmail: email });
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = getChats;