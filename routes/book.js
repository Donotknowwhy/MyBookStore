const router = require('express').Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require("../middlewares/authMiddleware")


router.post("/",authMiddleware,  bookController.addABook)

router.get("/",authMiddleware, bookController.getAllBooks)

router.get("/:id",authMiddleware, bookController.getABook)

router.put("/:id",authMiddleware, bookController.updateBook)

router.delete("/:id",authMiddleware, bookController.deleteBook)

module.exports = router