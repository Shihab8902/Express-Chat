const messageRequestCollection = require("../../model/messageRequest");

const getMessageRequest = async (req, res) => {
    try {
        const email = req.query.email;
        const result = await messageRequestCollection.find({ recipientEmail: email });
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = getMessageRequest;