module.exports = ( app ) => {

    const Users = app.models.users;

    return {
        index: ( req, res, next ) => {
            Users.find({
                level: 2
            }, ( err, result ) => {

                if( err )
                    return next( err );

                res.render('users/index', {
                    title: 'Listagem de professores',
                    users: result
                });
            });
        },
        view: ( req, res, next ) => {
            Users.findOne({
                _id: req.params.id
            }, ( err, data ) => {
    
                if( err || ! data )
                    return next( err );
                
                res.render('users/view', {
                    user: data
                });
            });   
        },
        register: ( req, res ) => {
            res.render('users/register', {
                user: new Users()
            });
        },
        registerStudent: ( req, res ) => {
            res.render('users/registerStudent', {
                user: new Users()
            });
        },
        edit: ( req, res, next ) => {

            Users.findOne({
                _id: req.params.id
            }, ( err, data ) => {
    
                if( err || ! data )
                    return next( err );
                
                res.render('users/edit', {
                    user: data
                });
            });
        },
        insert: ( req, res, next ) => {
            const u = new Users( req.body );
            
            u.save( ( err ) => {
                if( err )
                    return next( err );

                req.flash('success', 'Estudante cadastrado com sucesso!');


                if( req.body.level == 2 ) {
                    res.redirect('/admin/professores');
                } else {
                    res.redirect('/login');
                }
            });
        },
        update: ( req, res, next ) => {
            Users.update({
                _id: req.body.id
            }, {
                $set: req.body
            }, ( err ) => {
                if( err )
                    return next( err );

                req.flash('success', 'Estudante atualizado com sucesso!');
                res.redirect('/admin/professores');                
            });
        },
        delete: ( req, res, next ) => {

            Users.remove({
                _id: req.params.id
            }, ( err ) => {

                if( err )
                    return next( err );

                req.flash('success', 'Professor removido com sucesso!');
                res.redirect('/admin/professores');   
            });
        },
        asd: ( req, res, next ) => {
            Users.find({
                level: 2
            }, ( err, result ) => {

                if( err )
                    return next( err );

                res.render('users/teachers', {
                    title: 'Listagem de professores',
                    users: result
                });
            });
        }
    }
}