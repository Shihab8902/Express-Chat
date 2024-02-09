const contactCollection = require("../../model/contacts");
const userCollection = require("../../model/user");

const saveContact = async (req, res) => {
    try {
        const { name, email } = req.body;
        const recipientEmail = req.query.email;

        //Check for contact existence
        const availableContact = await userCollection.findOne({ email: email });

        if (availableContact) {
            const contact = {
                name,
                email,
                photo: availableContact.photo,
                recipientEmail
            }

            const newContact = contactCollection(contact);
            const result = await newContact.save();
            return res.status(201).send(result);
        }

        res.send("No user found!");

    }
    catch (error) {
        console.log(error);
    }
}



module.exports = saveContact;