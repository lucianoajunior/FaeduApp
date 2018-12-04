const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const load = require('express-load');
const mongoose = require('mongoose').set('debug', true);
const session = require('express-session');
const moment = require('moment');
const flash = require('flash');
const expressValidator = require('express-validator');
const app = express();

require("dotenv-safe").load();

const jwt = require('jsonwebtoken');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use(cookieParser());
//Remove o warning de deprecated do express-session ---> resave: true e ---> saveUninitialized: true
app.use(session({
  secret: 'superSecret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


//helpers
app.use(function (req, res, next) {
  res.locals.session = req.session;
  res.locals.moment = moment;
  next();
});

//isto faz com que o modulo moment fique disponivel para todo o projeto
//fonte: http://stackoverflow.com/questions/12794860/how-to-use-node-modules-like-momentjs-in-ejs-views
app.locals.moment = moment;

// Carregamos coisas importantes usando o Express-load.
load('models').then('controllers').then('routes').then('api/routes').into( app );

// Conexao com o MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tcc', function (err) {
  if (err) {
    console.log("Erro ao conectar ao banco: " + err)
  } else {
    console.log("Conexão estabelecida com sucesso !")
  }
})

//Iniciando a app
app.listen(3000, function () {
  console.log('Servidor rodando na porta 3000');
});

// //ERROS
// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

app.use( (err, req, res, next) => {
  // log the error...
  res.status( 400 ).json({
    status: false,
    message: err.message
  });
})

module.exports = app;