const contactCollection = require("../../model/contacts");

const getContactDetails = async (req, res) => {
    try {
        const email = req.query.email;
        const result = await contactCollection.findOne({ email: email });
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = getContactDetails;
