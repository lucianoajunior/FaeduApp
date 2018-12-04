module.exports = ( app ) => {

    var Usuario = app.models.usuario;

    var UsuarioController = {
        registrar: ( req, res ) => {
            res.render('usuarios/registrar', {
                usuario: new Usuario()
            });
        },
        salvar: ( req, res ) => {

            const usuario = new Usuario( req.body );

            usuario.save( ( err ) => {
                if( ! err ) {
                    req.flash('info', 'Estudante cadastrado com sucesso!');
                    res.redirect('/painel');
                } else {
                    console.log( err.message );
                    res.end();
                }
            });
        }
    }

    return UsuarioController;
}