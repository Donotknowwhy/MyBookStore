const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
})


const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    publishedDate: {
        type: String
    },
    genres: {
        type: [String]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    publisherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publisher"
    }
});

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
})

const userSchema = new mongoose.Schema({
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  });

let Book = mongoose.model('Book', bookSchema)
let Author = mongoose.model('Author', authorSchema)
let Publisher = mongoose.model('Publisher', publisherSchema)
let User = mongoose.model('User', userSchema)

module.exports = { Book, Author, Publisher, User }