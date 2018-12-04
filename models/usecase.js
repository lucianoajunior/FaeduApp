var mongoose = require('mongoose');

module.exports = function () {
    var useCaseSchema = mongoose.Schema({
        conteudo: {
            type: String,
        },
        dataCadastro: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('UseCase', useCaseSchema );
}