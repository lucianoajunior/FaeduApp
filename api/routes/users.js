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
}