const router = require("express").Router()

router.post("/")
router.get("/")
router.get("/:productId")
router.put("/:productId")
router.delete("/:productId")

module.exports = router
