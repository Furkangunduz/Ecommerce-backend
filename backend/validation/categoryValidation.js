const Joi = require("joi")

const addCategoryValidation = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
})
const getCategoryValidation = Joi.object({
    categoryId: Joi.string()
        .required(),
})
const deleteCategoryValidation = Joi.object({
    categoryId: Joi.string()
        .required(),

})
const updateCategoryValidation = Joi.object({
    categoryId: Joi.string()
        .required(),
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
})


module.exports = {
    addCategoryValidation,
    getCategoryValidation,
    deleteCategoryValidation,
    updateCategoryValidation,
}

