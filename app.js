//Imports
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
//App declaration
const app = express();

//Passport Config
require('./config/passport')(passport);

//ROUTES
const auth = require('./routes/auth');
//index route
app.get('/', (req, res) => {
  res.send("IT WORKS");
});
//Use routes
app.use('/auth', auth);

//PORT
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});