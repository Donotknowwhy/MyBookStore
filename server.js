const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');
const authorRoute = require("./routes/author")
const bookRoute = require("./routes/book")
const publisherRoute = require("./routes/publisher")


dotenv.config();
mongoose.connect((process.env.MONGODB_URL))


app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(morgan('common'));


//routes

app.use("/v1/author", authorRoute);

app.use("/v1/book", bookRoute);

app.use("/v1/publisher", publisherRoute);

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
