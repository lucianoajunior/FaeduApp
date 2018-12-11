const mongoose = require('mongoose');

module.exports = () => {
    const submissionsSchema = mongoose.Schema({
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        exercise: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise'
        },
        json: {
            type: Object,
        },
        date: {
            type: Date,
            default: Date.now
        }
    }, {
        versionKey: false
    });

    return mongoose.model('Submission', submissionsSchema );
}