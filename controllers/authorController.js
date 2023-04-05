const {Author, Book} = require("../model/model");

const authorController = {
    addAuthor : async(req, res) => {
       try {
        const newAuthor = new Author(req.body);
        const savedAuthor = await newAuthor.save();
        res.status(200).json(savedAuthor);
       } catch (error) {
        res.status(500).json(error);
       }
    }
}

module.exports = authorController