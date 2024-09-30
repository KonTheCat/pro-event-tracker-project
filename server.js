const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require('morgan');

const app = express();

//--------------------------------------------------------------------\\

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

const authController = require('./controllers/auth.js');              // -> We'll instruct our Express app to use the `authController` for handling requests that match the /auth URL pattern.

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//-------------------------- Middleware --------------------------------\\

app.use(express.urlencoded({ extended: false }));                     // Middleware to parse URL-encoded data from forms.
app.use(methodOverride("_method"));                                   // Middleware for using HTTP verbs such as PUT or DELETE.
//app.use(morgan('dev'));                                             // Morgan for logging HTTP requests.

//----------------------------------------------------------------------\\

app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.use('/auth', authController);                                     // -> That code will funnel any requests starting with /auth to the `authController`.



//-----------------------------------------------------------------------\\
app.listen(port, () => {
    console.log(`The express app is ready on port ${port} 🎧`);
});

  
