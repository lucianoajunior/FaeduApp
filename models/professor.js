var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

module.exports = function () {
    var professorSchema = mongoose.Schema({
        nome: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            index: true
        },
        password: {
            type: String,
            trim: true
        },
        site: {
            type: String,
            trim: true
        },
        data_cadastro: {
            type: Date,
            default: Date.now
        }
    });

    // método para gerar a senha criptografada
    professorSchema.methods.generateHash = function ( password ) {
        return bcrypt.hashSync( password, bcrypt.genSaltSync(8), null );
    };

    // método para comparar senhas na tela de se logar no sistema
    professorSchema.methods.validPassword = function (password, oldPassword) {
        return bcrypt.compareSync( password, oldPassword, null );
    };

    return mongoose.model('Professor', professorSchema );
}