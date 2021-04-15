const { Decimal128 } = require("bson");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema ({
    image : {
        type: String,
        trim: true,
    },
    brandName : {
        type: String,
        trim: true,
    }, 
    description : {
        type: String,
        trim: true,
    },
    price : {
        type: Decimal128,
        trim: true,
    },
    isnew : {
        type: Boolean,
    },
    sale : {
        type: Boolean
    },
    outOfStock : {
        type: Boolean
    },
    discountByPercentage : {
        type: Number
    },
    rating : {
        type: Number
    },
    count : {
        type: Number
    },
    seller : {
        type: String
    },
    type : {
        type : String
    }

})

module.exports = mongoose.model( "Product", productSchema );