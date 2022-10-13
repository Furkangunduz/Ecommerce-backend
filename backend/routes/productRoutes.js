const router = require("express").Router()

const auth = require("../middleware/authmiddleware")
const {
    createProduct,
    getProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteProduct
} = require("../controllers/productController")

router.post("/", auth, createProduct)
router.get("/", auth, getProducts)
router.get("/:productId", auth, getSingleProduct)
router.patch("/:productId", auth, updateSingleProduct)
router.delete("/:productId", auth, deleteProduct)

module.exports = router
