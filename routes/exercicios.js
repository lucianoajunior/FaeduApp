module.exports = function (app) {

    var exercicio = app.controllers.exercicios;
    
    app.route('/exercicios').get( exercicio.index );
    app.route('/resolver').get( exercicio.resolver );
    app.route('/exercicios/cadastrar').get( exercicio.cadastrar ).post( exercicio.post );
}