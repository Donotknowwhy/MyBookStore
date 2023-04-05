const router = require('express').Router();
const authorController = require("../controllers/authorController")

router.post("/", authorController.addAuthor)

module.exports = router