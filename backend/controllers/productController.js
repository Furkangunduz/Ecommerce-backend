const { Category } = require("../models/categoryModel")
const { Product } = require("../models/productModel")

const {
    createProductValidation,
    getSingleProductValidation,
    updateSingleProductValidation,
    deleteProductValidation,
} = require("../validation/ProductValidation")



const createProduct = async (req, res) => {
    const { name, category_name, images } = req.body

    const { error } = createProductValidation.validate({ name, category_name, images })
    if (error) {
        res.status(400).json(error.details[0].message)
        return
    }

    const category = await Category.findOne({ name: category_name })

    if (!category) {
        res.status(400).json({ msg: "Couldn't find the category. Please create category first." })
        return
    }

    const product = await Product.create({ name, category: category_name, owner_id: req.user._id, images: images || [] })
    if (product) {
        category.product_list.push(product._id)
        category.save()

        res.status(201).json({
            _id: product._id,
            name: product.name,
            category: product.category,
            owner_id: req.user._id,
            images: product.images,
        })
    }
    else {
        res.status(400).json({ msg: "Couldn't create product." })
    }
}
const getProducts = async (req, res) => {
    const products = await Product.find({ owner_id: req.user._id })

    if (products) {
        res.status(201).json(products)
    } else {
        res.status(400).json({ msg: "Couldn't find products." })
    }
}
const getSingleProduct = async (req, res) => {
    const { productId } = req.params

    const { error } = getSingleProductValidation.validate({ productId })
    if (error) {
        res.status(400).json(error.details[0].message)
        return
    }

    const product = await Product.findById(productId)
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(400).json({ msg: "Couldnt find the product" })
    }
}
const updateSingleProduct = async (req, res) => {
    const { productId } = req.params
    const { name, category_name } = req.body

    const { error } = updateSingleProductValidation.validate({ productId, name, category_name, })
    if (error) {
        res.status(400).json(error.details[0].message)
        return
    }
    const product = await Product.findById(productId)

    if (product) {
        if (product.owner_id == req.user._id) {
            let msg = ""
            if (name) {
                msg += `Name changed ${product.name} ==> ${name} `
                await Product.findByIdAndUpdate(productId, { name })
            }
            if (category_name) {
                msg += `Category changed ${product.category} ==> ${category_name}`

                const newCategory = await Category.findOne({ name: category_name })
                if (newCategory) {
                    newCategory.product_list.push(product._id)
                    await newCategory.save()
                }
                else {
                    res.status(200).json({ msg: "Couldn't find the category. Please create category first. " })
                    return
                }

                await Category.findOneAndUpdate({ name: product.category }, { $pull: { product_list: { $in: [productId] } } })
            }
            res.status(200).json({ msg })
        } else {
            res.status(400).json({ msg: "This product is not yours." })
        }
    } else {
        res.status(400).json({ msg: "Couldnt find the product" })
    }

}
const deleteProduct = async (req, res) => {
    const { productId } = req.params

    const { error } = deleteProductValidation.validate({ productId })
    if (error) {
        res.status(400).json(error.details[0].message)
        return
    }
    const product = await Product.findById(productId)

    if (product) {
        if (product.owner_id == req.user._id) {
            await product.delete()
            const category = await Category.findOneAndUpdate({ name: product.category }, { $pull: { product_list: { $in: [productId] } } })
            res.status(200).json({ product, category: (category || {}) })
        } else {
            res.status(400).json({ msg: "This product is not yours." })
        }
    } else {
        res.status(400).json({ msg: "Couldnt find the product" })
    }
}

module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteProduct
}