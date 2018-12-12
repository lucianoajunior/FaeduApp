module.exports = ( app ) => {
    
    const Submissions = app.models.submissions;
    const Exercises = app.models.exercises;
    const VerifyToken = require('../middleware/VerifyToken');

    const correctUseCaseDiagram = require('../../helper/correctUseCaseDiagram');
    const correctClassDiagram = require('../../helper/correctClassDiagram');

    app.get('/api/submissions', VerifyToken, ( req, res, next ) => {

        Submissions.find()
        .populate('author')
        .populate('exercise')
        .exec( ( err, data ) => {

            if( err ) 
                return next( err );

            return res.status( 200 ).json( data );
        });
    });

    app.get('/api/submissions/author/:id', ( req, res, next ) => {

        Submissions.find({
            author: req.params.id
        })
        .populate('author')
        .populate({
            path: 'exercise',
            populate: {
                path: 'author',
                model: 'User'
            }
        })
        .exec( ( err, data ) => {

            if( err )
                return next( err );

            if( ! data )
                return res.status( 200 ).json({});

            return res.status( 200 ).json( data );
        });
        
    });

    app.get('/api/submissions/:id', VerifyToken, ( req, res, next ) => {

        Submissions.findOne({
            _id: req.params.id
        })
        .populate('author')
        .populate({
            path: 'exercise',
            populate: {
                path: 'author',
                model: 'User'
            }
        })
        .exec( ( err, data ) => {

            if( err )
                return next( err );

            return res.status( 200 ).json( data );
        });
    });

    app.post('/api/submissions', ( req, res, next ) => {

        const params = {
            author: req.body.author,
            exercise: req.body.exercise,
            json: ( typeof req.body.json == 'string' ) ? JSON.parse( req.body.json ) : req.body.json
        };

        const s = new Submissions( params );

        s.save( ( err ) => {

            if( err )
                return next( err );

            Submissions.findOne({
                _id: s._id
            })
            .populate('author')
            .populate({
                path: 'exercise',
                populate: {
                    path: 'author',
                    model: 'User'
                }
            })
            .exec( ( err, data ) => {
    
                if( err )
                    return next( err );

                const r = {
                    _id: data._id,
                    author: data.author,
                    exercise: data.exercise,
                    json: JSON.stringify( data.json ),
                    date: data.date
                };
    
                return res.status( 200 ).json( r );
            });
        });
    });

    app.get('/api/correct/:id', ( req, res, next ) => {

        Submissions.findOne({
            _id: req.params.id
        })
        .then( ( submission, err ) => {

            if( err )
                return next( err );

            Exercises.findOne({
                _id: submission.exercise
            })
            .then( ( exercise, err ) => {

                if( err )
                    return next( err );

                let correction = ( exercise.type == 1 )
                    ? correctUseCaseDiagram( exercise, submission )
                    : correctClassDiagram( exercise, submission );
                                
                res.status( 200 ).json({
                    status: true,
                    errors: correction
                });
            });
        });
    });
}