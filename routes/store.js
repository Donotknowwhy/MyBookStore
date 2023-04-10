const storeController = require("../controllers/storeController")
const router = require('express').Router();
const authMiddleware = require("../middlewares/authMiddleware")
const adminMiddleware = require("../middlewares/adminMiddleware")

router.post("/", authMiddleware, adminMiddleware, storeController.addStore)
router.post("/addBooksToStore", authMiddleware, adminMiddleware, storeController.addBooksToStore)

module.exports = router