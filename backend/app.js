const createError = require('http-errors');
const express = require('express');
const path = require('path');
const helmet = require('helmet')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport=require('passport');
const bodyParser = require("body-parser");
const cors = require('cors');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const keys=require('./config/keys');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


var whitelist = ['http://localhost:3000', 'https://kcakar.github.io','https://triaakademi.com','https://www.triaakademi.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.table(origin);
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus:200
}

// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(cors(corsOptions));

app.use(passport.initialize());
require('./config/passport');

app.use('/', indexRouter);
app.use('/api/v1/', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
