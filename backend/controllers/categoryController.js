const { Category } = require("../models/categoryModel")
const { Product } = require("../models/productModel")

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
const updateCategory = async (req, res) => {
    const { categoryId } = req.params
    const { name } = req.body
    const category = await Category.findByIdAndUpdate(categoryId, { name })

    if (category) {
        console.log("category", category)
        for (let i = 0; i < category.product_list.length; i++) {
            const product = await Product.findByIdAndUpdate(category.product_list[i], { category: name })
            if (product) console.log("product", product)
        }
    }
    res.status(200).json({ category: category, products: await Product.find({ category: name }) })

}
const deleteCategory = async (req, res) => {
    const { categoryId } = req.params

    if (!categoryId) {
        res.status(400).json({ msg: "Should provide categoryId" })
    }

    const category = await Category.findById(categoryId)


    if (category) {
        for (let i = 0; i < category?.product_list.length; i++) {
            const productId = category?.product_list[i];
            await Product.findByIdAndDelete(productId)
        }
        category.delete()

        res.status(200).json({ msg: "Succesfuly deleted", category: category.name })
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