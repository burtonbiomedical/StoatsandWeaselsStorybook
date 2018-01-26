//Imports
const express = require('express');
const mongoose = require('mongoose');
//App declaration
const app = express();

//ROUTES
app.get('/', (req, res) => {
  res.send("IT WORKS");
});

//PORT
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});