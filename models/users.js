const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

module.exports = () => {
    const usersSchema = mongoose.Schema({
        name: {
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
        level: {
            type: Number,
            trim: true
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    });

    usersSchema.methods.generateHash = ( password ) => {
        return bcrypt.hashSync( password, bcrypt.genSaltSync(8), null );
    };

    usersSchema.methods.validPassword = ( password, oldPassword ) => {
        return bcrypt.compareSync( password, oldPassword, null );
    };

    return mongoose.model('User', usersSchema );
}