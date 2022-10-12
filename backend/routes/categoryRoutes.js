const router = require("express").Router()

router.post("/")
router.get("/")
router.get("/:categoryId")
router.put("/:categoryId")
router.delete("/:categoryId")

module.exports = router
