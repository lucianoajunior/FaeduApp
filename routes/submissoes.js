module.exports = function (app) {
    var submissoes = app.controllers.submissoes;

    app.route('/submissoes').get( submissoes.index );
}