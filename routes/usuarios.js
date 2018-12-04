module.exports = function( app ) {
    var usuarios = app.controllers.usuarios;
    app.route('/usuarios/registrar').get( usuarios.registrar ).post( usuarios.salvar );
}