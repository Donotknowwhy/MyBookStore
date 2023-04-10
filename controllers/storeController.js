const { Store, Book } = require("../model/model")

const storeController = {
    addStore: async (req, res) => {
        try {
            const { name, address, phoneNumber } = req.body;
            const store = new Store({ name, address, phoneNumber, userId: req.user.id });
            await store.save();
            res.status(200).json({ message: 'Store added successfully', data: store });
        } catch (error) {
            res.status(500).json({ message: 'Failed to add store', error });
        }
    },
    addBooksToStore: async (req, res) => {
        try {
          const { storeId, books } = req.body;
          
          // Check if store exists
          const store = await Store.findById(storeId).populate('books');
          if (!store) {
            return res.status(404).json({ message: 'Store not found' });
          }
    
          // Check if books exist
          const bookIds = books.map((book) => book.id);
          const foundBooks = await Book.find({ _id: { $in: bookIds } });
          if (foundBooks.length !== bookIds.length) {
            return res.status(404).json({ message: 'One or more books not found' });
          }
    
          store.books.push(...foundBooks);
          await store.save();
    
          res.status(200).json({ message: 'Books added successfully to the store', data: store });
        } catch (error) {
          res.status(500).json({ message: 'Failed to add books to the store', error });
        }
      },
}

module.exports = storeController