var mongoose = require('mongoose');

module.exports = function () {
    var exercicioSchema = mongoose.Schema({
        titulo: {
            type: String,
            trim: true
        },
        descricao: {
            type: String,
            trim: true,
        },
        dataCadastro: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('Exercicio', exercicioSchema );
}