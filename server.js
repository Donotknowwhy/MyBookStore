const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');

//route
const authorRoute = require("./routes/author")
const bookRoute = require("./routes/book")
const publisherRoute = require("./routes/publisher")
const userRoute = require("./routes/user")
const storeRoute = require("./routes/store")


const sgMail = require('@sendgrid/mail');


dotenv.config();
mongoose.connect((process.env.MONGODB_URL))
sgMail.setApiKey((process.env.SENDGRID_API_KEY));

const corsOptions = {
  origin: ['http://localhost:3001', 'https://another-website.com'],
};

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors(corsOptions));
app.use(morgan('common'));

//routes
app.use("/v1/author", authorRoute);
app.use("/v1/book", bookRoute);
app.use("/v1/publisher", publisherRoute);
app.use("/v1/user", userRoute);
app.use("/v1/store", storeRoute);


app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
