module.exports = function (app) {
    var useCaseModel = app.models.usecase;

    var useCaseController = {
        index: function( req, res ) {
            res.render('diagramas/usecase');
        }
    }
    
    return useCaseController;
}