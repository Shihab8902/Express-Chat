const { default: mongoose } = require("mongoose");
const contactCollection = require("../../model/contacts");

const deleteContact = async (req, res) => {
    try {
        const id = req.query.id;
        const result = await contactCollection.findByIdAndDelete(new mongoose.Types.ObjectId(id));
        res.send(result);
    }

    catch (error) {

    }
}


module.exports = deleteContact;