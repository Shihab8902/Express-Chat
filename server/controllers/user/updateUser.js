const chatCollection = require("../../model/chat");
const contactCollection = require("../../model/contacts");
const messageRequestCollection = require("../../model/messageRequest");
const userCollection = require("../../model/user");


const updateUser = async (req, res) => {
    try {
        const email = req.query.email;
        const data = req.body;

        await userCollection.updateOne({ email: email }, data);


        //Update other collection similar data is image changes
        if (data?.photo) {
            await contactCollection.updateMany({ email: email }, data);     //Update in contact collection

            await chatCollection.updateMany({ email: email }, data);        //Update in chat collection

            await messageRequestCollection.updateMany({ email: email }, data);        //Update in message request collection
        }


        res.send("success");
    }
    catch (error) {
        console.log(error);
    }
}



module.exports = updateUser;