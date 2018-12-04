module.exports = function( app ) {

    var submissao = app.models.submissao;

    var submissoesController = {
        index: function( req, res ) {
            submissao.find( function( err, data ) {
                if( ! err ) {
                    res.render('submissoes/index', {
                        title: 'Listagem de estudantes',
                        submissoes: data
                    });
                } else {
                    console.log( err.message );
                }
            });
        }
    }
    
    return submissoesController;
}