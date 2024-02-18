const mongoose = require("mongoose");

const messageRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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



const messageRequestCollection = new mongoose.model("message-requests", messageRequestSchema);

module.exports = messageRequestCollection;

