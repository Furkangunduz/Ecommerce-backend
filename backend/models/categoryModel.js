const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true
    },
    product_list: [{
        type: mongoose.Schema.Types.ObjectId,
    },]
})


module.exports = { Category: mongoose.model("Category", categorySchema) }