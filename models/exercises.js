const mongoose = require('mongoose');

module.exports = () => {
    const exercisesSchema = mongoose.Schema({
        title: {
            type: String,
            trim: true
        },
        author: {

        },
        type: {
            type: Number,
        },
        description: {
            type: String,
            trim: true
        }
    });

    return mongoose.model('Exercise', exercisesSchema );
}