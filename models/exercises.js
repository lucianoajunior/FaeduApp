const mongoose = require('mongoose');

module.exports = () => {
    const exercisesSchema = mongoose.Schema({
        title: {
            type: String,
            trim: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        },
        type: {
            type: Number,
        },
        description: {
            type: String,
            trim: true
        }
    }, {
        versionKey: false
    });

    return mongoose.model('Exercise', exercisesSchema );
}