const { Book, Publisher } = require("../model/model");

const publisherController = {
  // Create a new publisher
  createPublisher: async (req, res) => {
    try {
      const newPublisher = new Publisher(req.body);
      const savedPublisher = await newPublisher.save();
      res.status(200).json(savedPublisher);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Get all publishers
  getAllPublishers: async (req, res) => {
    try {
      const allPublishers = await Publisher.find().populate('books');
      res.status(200).json(allPublishers);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Get a publisher by id
  getPublisherById: async (req, res) => {
    try {
      const publisher = await Publisher.findById(req.params.id).populate('books');
      res.status(200).json(publisher);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Update a publisher by id
  updatePublisherById: async (req, res) => {
    try {
      const publisher = await Publisher.findById(req.params.id);
      await publisher.updateOne({ $set: req.body });
      res.status(200).json("Update successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Delete a publisher by id
  deletePublisherById: async (req, res) => {
    try {
      // Remove all books related to this publisher
      await Book.deleteMany({ publisherId: req.params.id });
      // Remove the publisher document
      await Publisher.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = publisherController;
