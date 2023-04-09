const publisherController = require("../controllers/publisherController");

const router = require('express').Router();

router.post("/", publisherController.createPublisher);

router.get("/", publisherController.getAllPublishers);

router.get("/:id", publisherController.getPublisherById);

router.put("/:id", publisherController.updatePublisherById);

router.delete("/:id", publisherController.deletePublisherById);

module.exports = router