const contactCollection = require("../../model/contacts");
const messageRequestCollection = require("../../model/messageRequest");

const postMessageRequest = async (req, res) => {
    try {
        const data = req.body;

        //Check for existing message request
        const isMessageRequestExist = await messageRequestCollection.findOne({ email: data.email, recipientEmail: data.recipientEmail });
        if (isMessageRequestExist) {
            return res.send("Message request already exist!");
        }

        //Check for existing contact
        const isContactExist = await contactCollection.findOne({ email: data.email, recipientEmail: data.recipientEmail });
        if (isContactExist) {
            return res.send("User with this credential already exist in the contact list!");
        }


        //Create a new message request
        await messageRequestCollection.create(data);

        res.send("Message request sent!");

    }
    catch (error) {
        console.log(error);
    }
}


module.exports = postMessageRequest;