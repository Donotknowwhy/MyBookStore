const router = require('express').Router();
const authorController = require("../controllers/authorController")
const authMiddleware = require("../middlewares/authMiddleware")

// add author
router.post("/", authMiddleware, authorController.addAuthor);

// get all author
router.get("/", authMiddleware, authorController.getAllAuthor);

router.get("/:id", authMiddleware, authorController.getAnAuthor);

router.put("/:id", authMiddleware, authorController.updateAuthor);

module.exports = router