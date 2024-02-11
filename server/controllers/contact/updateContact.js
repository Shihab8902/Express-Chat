const { default: mongoose } = require("mongoose");
const { findByIdAndUpdate } = require("../../model/contacts");
const userCollection = require("../../model/user");
const contactCollection = require("../../model/contacts");

const updateContact = async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body;

        const isExist = await userCollection.findOne({ email: data?.email });

        if (!isExist) {
            return res.send("No user found!");
        }

        const result = await contactCollection.findByIdAndUpdate(new mongoose.Types.ObjectId(id), data);

        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = updateContact;