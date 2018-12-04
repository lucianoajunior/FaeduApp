module.exports = function( app ) {

    var professoresController = {    
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
        }
    }
    
    return professoresController;
}