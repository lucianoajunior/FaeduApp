module.exports = ( app ) => {

    var useCase = app.models.usecase;

    var useCaseController = {
        index: ( req, res ) => {
            res.render('diagramas/usecase', {
                title:'Diagrama de Caso de Uso'
            });
        },
        salvar: ( req, res ) => {

            var UseCase = new useCase( req.body );

            UseCase.save( function( err ) {
                if( ! err ) {
                    req.flash('info', 'Registro cadastrado com sucesso!');
                } else {
                    console.log( err.message );
                }
            });

            return res.end();
        }
    }
    
    return useCaseController;
}