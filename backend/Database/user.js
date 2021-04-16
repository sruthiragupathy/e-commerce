const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema ({
    name: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    wishlist: {
        type: Array,
        default: []
    },
    cart: {
        type: Array,
        default: []
    }
    
})

module.exports = mongoose.model( "User", userSchema );