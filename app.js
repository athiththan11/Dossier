require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var graphqlHTTP = require('express-graphql');
var cors = require('cors');

var indexRouter = require('./routes/index');
var devSchema = require('./graphql/devSchema');

var app = express();

// mongodb connection setup
// '<MongoDB URL | MongoDB Environment Variable>'
mongoose
	.connect(process.env.MONGODB, {
		promiseLibrary: require('bluebird'),
		useNewUrlParser: true
	})
	.then(() => console.info('mongodb connection successful'))
	.catch((err) => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', cors());
app.use('/', indexRouter);
app.use(
	'/graphql',
	cors(),
	graphqlHTTP({
		schema: devSchema,
		rootValue: global,
		graphiql: true
	})
);

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
