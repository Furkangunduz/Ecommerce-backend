const Joi = require("joi")

const createProductValidation = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    category_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    images: Joi.array(),
})
const getSingleProductValidation = Joi.object({
    productId: Joi.string()
        .required(),
})
const updateSingleProductValidation = Joi.object({
    productId: Joi.string()
        .required(),
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    category_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

})
const deleteProductValidation = Joi.object({
    productId: Joi.string()
        .required(),
})

module.exports = {
    createProductValidation,
    getSingleProductValidation,
    updateSingleProductValidation,
    deleteProductValidation,
}
