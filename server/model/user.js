const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
        default: "https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp"
    }
});


const userCollection = mongoose.model("users", userSchema);

module.exports = userCollection;