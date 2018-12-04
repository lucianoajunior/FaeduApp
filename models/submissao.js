var mongoose = require('mongoose');

module.exports = function () {
    var submissaoSchema = mongoose.Schema({
        conteudo: {
            type: String,
            trim: true
        },
        dataCadastro: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('Submissao', submissaoSchema );
}