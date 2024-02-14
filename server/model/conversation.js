const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    messages: [{
        messageId: {
            type: String,
        },
        from: {
            type: String
        },
        to: {
            type: String
        },
        content: {
            type: String
        }
    }]
});


const conversationCollection = mongoose.model("conversations", conversationSchema);


module.exports = conversationCollection;