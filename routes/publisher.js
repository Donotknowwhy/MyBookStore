const router = require('express').Router();
const publisherController = require("../controllers/publisherController");
const authMiddleware = require("../middlewares/authMiddleware")


router.post("/",authMiddleware, publisherController.createPublisher);

router.get("/",authMiddleware, publisherController.getAllPublishers);

router.get("/:id",authMiddleware, publisherController.getPublisherById);

router.put("/:id",authMiddleware, publisherController.updatePublisherById);

router.delete("/:id",authMiddleware, publisherController.deletePublisherById);

module.exports = router