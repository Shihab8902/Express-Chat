const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    recipientEmail: {
        type: String,
        required: true
    }
});


const contactCollection = mongoose.model('contacts', contactSchema);

module.exports = contactCollection;