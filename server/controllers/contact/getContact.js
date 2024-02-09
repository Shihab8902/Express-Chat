const contactCollection = require("../../model/contacts");

const getContact = async (req, res) => {
    try {
        const email = req.query.email;
        const result = await contactCollection.find({ recipientEmail: email });
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = getContact;