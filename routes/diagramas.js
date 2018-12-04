module.exports = function (app) {
    var useCaseDiagram = app.controllers.usecases;
    var classDiagram = app.controllers.classes;


    app.route('/exercicios/caso-de-uso/cadastrar').get( useCaseDiagram.index );

    app.route('/diagramas/caso-de-uso').get( useCaseDiagram.index );
    app.route('/diagramas/caso-de-uso/salvar').post( useCaseDiagram.salvar );

    app.route('/diagramas/classe').get( classDiagram.index );
}