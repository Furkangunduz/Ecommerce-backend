const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    owner_id: {
        type: String,
        required: [true, "Please add a owner"],
    },
    category: {
        type: String,
        required: [true, "Please add a category"],
    },
    images: [{ type: String }]
}, { timestamps: true })


module.exports = { Product: mongoose.model("Product", productSchema) }