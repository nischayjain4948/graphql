const mongoose = require("mongoose");

const Product = mongoose.Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    discountPercentage: {
        type: Number

    },
    rating: {
        type: Number
    },
    stock: {
        type: Number
    },
    brand: {
        type: String
    },
    category: {
        type: String
    },
    thumbnail: {
        type: String
    },
    images: {
        type: Array
    }
})
module.exports = mongoose.model("item", Product)