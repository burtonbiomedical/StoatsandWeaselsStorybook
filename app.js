//Imports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOveride = require('method-override');

//Load keys
const keys = require('./config/keys')

//Load handlebars helpers
const {
  truncate,
  stripTags,
  formatDate,
  select,
  editIcon
} = require('./helpers/hbs');

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

//Load Models
require('./models/Users');
require('./models/Story');

//Passport Config
require('./config/passport')(passport);

//Initialise App
const app = express();

//Handlebars middleware
app.engine('handlebars', exphbs({
  helpers: {
    truncate: truncate,
    stripTags: stripTags,
    formatDate: formatDate,
    select: select,
    editIcon: editIcon
  },
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Method Override middhelware
app.use(methodOveride('_method'));

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories')

//Use routes
app.use('/auth', auth);
app.use('/', index);
app.use('/stories', stories);

//PORT
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});