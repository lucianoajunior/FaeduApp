var mongoose = require('mongoose');

module.exports = function () {
    var estudanteSchema = mongoose.Schema({
        nome: {
            type: String,
            trim: true
        },
        dataCadastro: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('Estudante', estudanteSchema );
}