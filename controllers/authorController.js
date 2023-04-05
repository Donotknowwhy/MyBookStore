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
    },
    getAllAuthor : async(req, res) => {
        try {
           const authors = await Author.find();
            res.status(200).json(authors);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAnAuthor: async(req, res) => {
        try {
            const author = await Author.findById(req.params.id).populate("books")
           res.status(200).json(author) 
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateAuthor: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id);
            await author.updateOne({$set: req.body});
            res.status(200).json('update successfully');
        } catch (error) {
            res.status(500).json(error)  
        }
    }
}

module.exports = authorController