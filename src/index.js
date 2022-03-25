require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const expressSession = require('express-session')
const expressMysqlSession = require('express-mysql-session')
const passport = require('passport');

// initializations
const app = express();
require('./lib/passport.js');

const { database  } = require('./keys');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir:  path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars.js'),
}));
app.set('view engine', 'hbs');

// middlewares
app.use(expressSession({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false,
  store: new expressMysqlSession(database)
}));
app.use(flash());
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())

// Global variables
app.use((req, res, next) => {
  app.locals.success = req.flash('Success');
  app.locals.success = req.flash('message');
  app.locals.user = req.user;
  next();
});

// routes
app.use(require('./routes'));
app.use(require('./routes/authentication.js'));
app.use('/links', require('./routes/links.js'));

// static files
app.use(express.static(path.join(__dirname, '/public')))

// starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

