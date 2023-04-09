const {Author, Book, Publisher} = require("../model/model");

const bookController = {
    addABook: async (req, res) => {
        try {
            if (!req.body.author || !req.body.publisherId) {
                return res.status(400).json({ message: 'Author or PublisherId is required' });
              }
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();

            // Add book to author's books array
            if (req.body.author) {
                const author = Author.findById(req.body.author);
                await author.updateOne({ $push: { books: savedBook._id } });
            }

            // Add book to publisher's books array
            if (req.body.publisherId) {
                const publisher = await Publisher.findById(req.body.publisherId);
                await publisher.updateOne({ $push: { books: savedBook._id } });
            }

            res.status(200).json(savedBook);
        } catch (error) {
            res.status(500).json(error);
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
          await Author.updateMany(
            { books: req.params.id },
            { $pull: { books: req.params.id } }
          );
          await Book.findByIdAndDelete(req.params.id);
          res.status(200).json("Deleted successfully");
        } catch (err) {
          res.status(500).json(err);
        }
      },
}

module.exports = bookController