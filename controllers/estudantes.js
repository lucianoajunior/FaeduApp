module.exports = function( app ) {

    var Estudante = app.models.estudante;

    var estudantesController = {
        index: function( req, res ) {
            Estudante.find( function( err, data ) {
                if( ! err ) {
                    res.render('estudantes/index', {
                        title: 'Listagem de estudantes',
                        estudantes: data
                    });
                } else {
                    console.log( err.message );
                }
            });
        },
        cadastrar: function( req, res ) {
            res.render('estudantes/cadastrar', {
                estudante: new Estudante()
            });
        },
        post: function( req, res ) {
            var estudante = new Estudante( req.body );

            estudante.save( function( err ) {
                if( ! err ) {
                    req.flash('info', 'Estudante cadastrado com sucesso!');
                    res.redirect('/estudantes');
                } else {
                    console.log( err.message );
                    res.end();
                }
            });            
        },
        visualizar: function( req, res ) {
            Estudante.findById( req.params.id, function( err, data ) {
                if( ! err ) {
                    res.render('estudantes/visualizar', {
                        estudante: data
                    });
                } else {
                    console.log( err.message );
                    res.end();                    
                }
            });
        },
        remover: function( req, res ) {
            Estudante.remove({
                _id: req.params.id
            }, function( err ) {
                if( err ) console.log( err.message );

                res.redirect('/estudantes');
            })
        }
    }
    
    return estudantesController;
}