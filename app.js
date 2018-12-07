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

app.use(session({
    secret: 'superSecret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


//helpers
app.use(function(req, res, next) {
    res.locals.session = req.session;
    res.locals.moment = moment;
    next();
});

//isto faz com que o modulo moment fique disponivel para todo o projeto
//fonte: http://stackoverflow.com/questions/12794860/how-to-use-node-modules-like-momentjs-in-ejs-views
app.locals.moment = moment;

// Carregamos coisas importantes usando o Express-load.
load('models').then('controllers').then('routes').then('api/routes').into(app);

// Conexao com o MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tcc', function(err) {
    if (err) {
        console.log("Erro ao conectar ao banco: " + err)
    } else {
        console.log("Conexão estabelecida com sucesso !")
    }
})


const port = process.env.PORT || 80;

app.listen(port, function() {
    console.log('Servidor rodando na porta', port );
});

app.use((err, req, res, next) => {
    res.status(400).json({
        status: false,
        message: err.message
    });
})

module.exports = app;