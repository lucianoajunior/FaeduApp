module.exports = function( app ) {

    var Exercicio = app.models.exercicio;

    var exerciciosController = {    
        index: function( req, res ) {
            Exercicio.find( function( err, data ) {
                if( ! err ) {
                    res.render('exercicios/index', {
                        title: 'Listagem de exercícios',
                        exercicios: data
                    });
                } else {
                    console.log( err.message );
                }
            });
        },
        cadastrar: function( req, res ) {
            res.render('exercicios/cadastrar', {
                exercicio: new Exercicio()
            });
        },
        post: function( req, res ) {
            var exercicio = new Exercicio( req.body );

            exercicio.save( function( err ) {
                if( ! err ) {
                    req.flash('info', 'Exercício cadastrado com sucesso!');
                    res.redirect('/exercicios');
                } else {
                    console.log( err.message );
                    res.end();
                }
            });
        },
        resolver: ( req, res ) => {
            res.render('exercicios/resolver');
        }
    }
    
    return exerciciosController;
}