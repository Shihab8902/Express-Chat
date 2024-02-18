const contactCollection = require("../../model/contacts");
const messageRequestCollection = require("../../model/messageRequest");

const saveMessageRequestsToContact = async (req, res) => {
    try {
        const data = req.body;

        //Check for contact duplication
        const isExist = await contactCollection.findOne({ email: data.email, recipientEmail: data.recipientEmail });
        if (isExist) {
            return res.send("This contact already exist!");
        }

        const newContact = contactCollection(data);
        await newContact.save();

        //Delete the message request
        await messageRequestCollection.deleteOne({ email: data.email, recipientEmail: data.recipientEmail });

        res.send({ message: "success" });



    }
    catch (error) {
        console.log(error);
    }
}


module.exports = saveMessageRequestsToContact;