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

app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'jade');

app.use( logger('dev') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
    extended: false
}));

app.use( expressValidator() );
app.use( cookieParser() );

app.use(session({
    secret: 'superSecret',
    resave: true,
    saveUninitialized: true
}));

app.use( express.static( path.join(__dirname, 'public') ) );
app.use( flash() );

// Helpers.
app.use( (req, res, next) => {
    res.locals.session = req.session;
    res.locals.moment = moment;
    next();
});

app.locals.moment = moment;

// Carregamos coisas importantes usando o Express-load.
load('models').then('controllers').then('routes').then('api/routes').into(app);

// Conexao com o MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tcc', ( err ) => {
    if( err ) {
        console.log("Erro ao conectar ao banco: " + err )
    } else {
        console.log("Conexão estabelecida com sucesso!")
    }
});

const port = process.env.PORT || 80;

app.listen( port, () => {
    console.log('Servidor rodando na porta', port );
});

// Error handler on pages not found.
app.use( ( req, res, next ) => {
    const err = new Error('Page Not Found');
    err.statusCode = 404;
    err.shouldRedirect = true;
    next( err );
});

// Error handler just for API routes.
app.use("/api", ( err, req, res, next ) => {
    res.status( err.status || 500 );
    res.json({
        status: false,
        error: err.message
    });
});

// Default error handler.
app.use( ( err, req, res, next ) => {
    res.status( err.status || 500 );
    if( err.shouldRedirect ) {
        res.render('error');
    } else {

        // Debug.
        if( app.get('env') == 'development');
            res.status( err.statusCode ).send( err.message );

        // Fail quietly.
        res.end();
    }
});

module.exports = app;