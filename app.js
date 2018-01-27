//Imports
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');

//Load keys
const keys = require('./config/keys')

//Map global promises
mongoose.Promise = global.Promise;
//Mongoose connect
mongoose.connect(keys.mongoURI,{
  useMongoClient: true
}).then(() => {
  console.log("Mongodb connected...")})
  .catch(err => {
  console.log(err)
  });

//Load User Model
require('./models/Users');

//Passport Config
require('./config/passport')(passport);

//Initialise App
const app = express();

//Handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//Session and cookie-parser middleware
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//ROUTES
const auth = require('./routes/auth');
const index = require('./routes/index');

//Use routes
app.use('/auth', auth);
app.use('/', index)

//PORT
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});