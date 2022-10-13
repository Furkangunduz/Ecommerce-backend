const router = require("express").Router()
const auth = require("../middleware/authmiddleware")
const {
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory } = require("../controllers/categoryController")



router.post("/", auth, addCategory)
router.get("/", auth, getAllCategories)
router.get("/:categoryId", auth, getCategory)
router.patch("/:categoryId", auth, updateCategory)
router.delete("/:categoryId", auth, deleteCategory)

module.exports = router
