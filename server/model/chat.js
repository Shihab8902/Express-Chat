const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Unknown'
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


const chatCollection = mongoose.model('chats', chatSchema);

module.exports = chatCollection;