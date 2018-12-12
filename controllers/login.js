module.exports = ( app ) => {

    const Users = app.models.users;

    return {
        index: ( req, res ) => {
            res.render('login');
        },
        authenticate: ( req, res ) => {
            
            Users.findOne({
                email: req.body.email,
                password: req.body.password
            }, ( err, data ) => {

                if( err || ! data ) {
                    req.flash('error', 'Dados inválidos. Por favor, tente novamente.');

                    if( data.level == 1 ) {
                        res.redirect('/admin');
                    } else {
                        res.redirect('/login');
                    }

                    res.end();
                }

                req.session.isLogged = true;
                req.session._id = data._id;
                req.session.name = data.name;
                req.session.email = data.email;
                req.session.level = data.level;

                res.redirect( ( data.level == 1 ) ? '/admin/painel' : '/painel');
            });
        },
        logout: ( req, res ) => {
            req.session.destroy();
            res.redirect("/");
        }
    }
}