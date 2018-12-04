module.exports = ( app ) => {

    var Usuario = app.models.usuario;

    var LoginController = {
        index: ( req, res ) => {
            res.render('login');
        },
        autenticar: ( req, res ) => {
            
            Usuario.findOne({
                'email': req.body.email,
                'password': req.body.password
            }, ( err, data ) => {

                if( err || ! data ) {
                    req.flash('error', 'Dados inválidos. Por favor, tente novamente.');
                    res.redirect('/login');
                }

                if( data ) {
                    // Criamos as sessões.
                    req.session.isLogged = true;
                    req.session.nome = data.nome;
                    req.session.email = data.email;

                    res.redirect('/exercicios');
                }
            });
        },
        logout: ( req, res ) => {
            req.session.destroy();
            res.redirect("/");
        }
    }

    return LoginController;
}