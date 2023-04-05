const {Author, Book} = require("../model/model");

const bookController = {
    addABook: async (req, res) => {
        try {
            const newBook = new Book(req.body)
            const savedBook = await newBook.save();
            if( req.body.author){
                const author = Author.findById(req.body.author);
                await author.updateOne({$push: {books: savedBook._id}})
            }
            res.status(200).json(savedBook)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllBooks: async (req, res) => {
        try {
           const allBooks = await Book.find();
           res.status(200).json(allBooks) 
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getABook: async (req, res) => {
        try {
            const ABook = await Book.findById(req.params.id).populate('author');
            res.status(200).json(ABook)
        } catch (error) {
            res.status(500).json(error) 
        }
    },
    updateBook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            await book.updateOne({$set: req.body});
            res.status(200).json('update successfully');
        } catch (error) {
            res.status(500).json(error)  
        }
    },
    deleteBook: async (req, res) => {
        try {
            
        } catch (error) {
            res.status(500).json(error)  
        }
    }
}

module.exports = bookController