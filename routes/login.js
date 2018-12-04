module.exports = function( app ) {
    var login = app.controllers.login;
    app.route('/login').get( login.index ).post( login.autenticar );
    app.route('/logout').get( login.logout );
}