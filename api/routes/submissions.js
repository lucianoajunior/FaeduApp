module.exports = ( app ) => {
    
    const Submissions = app.models.submissions;
    const VerifyToken = require('../middleware/VerifyToken');

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

    app.get('/api/submissions/author/:id', VerifyToken, ( req, res, next ) => {

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
        .populate('exercise')
        .exec( ( err, data ) => {

            if( err )
                return next( err );

            return res.status( 200 ).json( data );
        });
    });

    app.post('/api/submissions', VerifyToken, ( req, res, next ) => {

        const s = new Submissions( req.body );

        s.save( ( err ) => {

            if( err ) 
                return next( err );

            return res.status( 200 ).json({
                status: true,
                message: 'Submission registered successfully!'
            });
        });
    });
}