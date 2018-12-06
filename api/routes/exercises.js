module.exports = ( app ) => {
    
    const Exercises = app.models.exercises;
    const VerifyToken = require('../middleware/VerifyToken');
    
    // List all exercises.
    app.get('/api/exercises', VerifyToken, ( req, res, next ) => {

        Exercises.find({
            $or: [
                {
                    title: new RegExp( req.query.s )
                }, {
                    description: new RegExp( req.query.s )
                }
            ]
        }, ( err, data ) => {

            if( err ) {
                const error = new Error( err.message );
                error.httpStatusCode = 400;
                return next( error );
            }

            return res.status( 200 ).json( data );
        });
    });

    // List all exercises from an author.
    app.get('/api/exercises/author/:id', VerifyToken, ( req, res, next ) => {
        Exercises.find({
            author: req.params.id
        })
        .populate('author')
        .exec( ( err, data ) => {

            if( err ) {
                const error = new Error( err.message );
                error.httpStatusCode = 400;
                return next( error );
            }

            if( ! data )
                return res.status( 200 ).json({});

            return res.status( 200 ).json( data );
        });
    });

    // Return an exercise by id.
    app.get('/api/exercises/:id', VerifyToken, ( req, res, next ) => {

        Exercises.findOne({
            _id: req.params.id
        })
        .populate('author')
        .exec( ( err, data ) => {

            if( err ) {
                const error = new Error( err.message );
                error.httpStatusCode = 400;
                return next( error );
            }
            
            if( data ) {
                return res.status( 200 ).json( data );
            }
        });
    });

    // Register a new exercise.
    app.post('/api/exercises', VerifyToken, ( req, res, next ) => {

        const e = new Exercises( req.body );

        e.save( ( err ) => {

            if( err ) {
                const error = new Error( err.message );
                error.httpStatusCode = 400;
                return next( error );
            }

            return res.status( 200 ).json({
                status: true,
                message: 'Exercise registered successfully!'
            });
        });
    });

    // Update an exercise.
    app.put('/api/exercises/:id', VerifyToken, ( req, res, next ) => {

        Exercises.findOneAndUpdate({
            _id: req.params.id
        }, req.body, ( err ) => {

            if( err ) {
                const error = new Error( err.message );
                error.httpStatusCode = 400;
                return next( error );
            }

            return res.status( 200 ).json({
                status: true,
                message: "Exercise successfully updated!"
            });
        });
    });

    // Delete an user.
    app.delete('/api/exercises/:id', VerifyToken, ( req, res, next ) => {

        Exercises.deleteOne({
            _id: req.params.id
        }, ( err ) => {

            if( err ) {
                const error = new Error( err.message );
                error.httpStatusCode = 400;
                return next( error );
            }

            return res.status( 200 ).json({
                status: true,
                message: "Exercise successfully removed!"
            });
        });
    });
}