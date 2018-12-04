module.exports = function (app) {

    var estudantes = app.controllers.estudantes;
    
    app.route('/estudantes').get( estudantes.index );
    app.route('/estudantes/cadastrar').get( estudantes.cadastrar ).post( estudantes.post );
    app.route('/estudantes/visualizar/:id').get( estudantes.visualizar );
    app.route('/estudantes/remover/:id').get( estudantes.remover );
}