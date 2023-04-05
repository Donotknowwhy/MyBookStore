const router = require('express').Router();
const authorController = require("../controllers/authorController")

// add author
router.post("/", authorController.addAuthor)

// get all author
router.get("/", authorController.getAllAuthor)

router.get("/:id", authorController.getAnAuthor)

router.put("/:id", authorController.updateAuthor)

module.exports = router