module.exports = ( app ) => {
    
    const Users = app.models.users;
    const VerifyToken = require('../middleware/VerifyToken');

    // Register a new user.
    app.post('/api/users', ( req, res, next ) => {

        const u = new Users( req.body );

        u.save( ( err ) => {

            if( err ) {
                const error = new Error( err.message );
                error.httpStatusCode = 400;
                return next( error );
            }                   

            return res.status( 200 ).json({
                status: true,
                message: 'User registered successfully!'
            });
        });
    });

    // Listando todos os usuários.
    app.get('/api/users', VerifyToken, ( req, res, next ) => {

        const args = ( req.query.level ) ? { level: req.query.level } : {};

        Users.find( args, ( err, data ) => {

            if( err ) {
                const error = new Error( err.message );
                error.httpStatusCode = 400;
                return next( error );
            }

            return res.status( 200 ).json( data );
        });
    });

    // Return an user by id.
    app.get('/api/users/:id', VerifyToken, ( req, res, next ) => {

        Users.findOne({
            _id: req.params.id
        }, ( err, data ) => {

            if( err ) {
                const error = new Error( err.message );
                error.httpStatusCode = 400;
                return next( error );
            }
            
            if( data ) {
                return res.status( 200 ).json({
                    status: true,
                    user: data
                });
            }
        });        
    });

    // Update an user.
    app.put('/api/users/:id', VerifyToken, ( req, res, next ) => {

        Users.findOneAndUpdate({
            _id: req.params.id
        }, req.body, ( err ) => {

            if( err ) {
                const error = new Error( err.message );
                error.httpStatusCode = 400;
                return next( error );
            }

            return res.status( 200 ).json({
                status: true,
                message: "User successfully updated!"
            });
        });
    });

    // Delete an user.
    app.delete('/api/users/:id', VerifyToken, ( req, res, next ) => {

        Users.deleteOne({
            _id: req.params.id
        }, ( err ) => {

            if( err ) {
                const error = new Error( err.message );
                error.httpStatusCode = 400;
                return next( error );
            }

            return res.status( 200 ).json({
                status: true,
                message: "User successfully removed!"
            });
        });
    });
}