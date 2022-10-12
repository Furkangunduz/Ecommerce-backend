const { Category } = require("../models/categoryModel")

const addCategory = async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(400).json({ msg: "Missing credential" })
    }

    const categoryExist = await Category.findOne({ name })
    if (categoryExist) {
        res.status(400).json({ msg: "This category already exist." })
        return
    }

    const category = await Category.create({ name })
    if (category) {
        res.status(201).json({
            _id: category._id,
            name: category.username,
            product_list: category.product_list,
        })
    }
    else {
        res.status(400).json({ msg: "Can't create category." })
    }
}
const getAllCategories = async (req, res) => {
    res.status(200).json({ categories: await Category.find() })
}
const getCategory = async (req, res) => {
    const { categoryId } = req.params

    if (!categoryId) {
        res.status(400).json({ msg: "Should provide categoryId" })
    }

    const category = await Category.findById(categoryId)

    if (category) {
        res.status(200).json({ category })
    }
    else {
        res.status(400).json({ msg: "Couldn't find the category." })
    }

}
const updateCategory = (req, res) => {

}
const deleteCategory = async (req, res) => {
    const { categoryId } = req.params

    if (!categoryId) {
        res.status(400).json({ msg: "Should provide categoryId" })
    }

    const deletedCategory = await Category.findByIdAndRemove(categoryId)

    if (deletedCategory) {
        res.status(200).json({ msg: "Succesfuly deleted", deletedCategory: deletedCategory.name })
    } else {
        res.status(400).json({ msg: "Couldn't find the category." })
    }
}

module.exports = {
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
}