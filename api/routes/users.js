module.exports = ( app ) => {
    
    const Users = app.models.users;
    const VerifyToken = require('../middleware/VerifyToken');

    // Register a new user.
    app.post('/api/users', VerifyToken, ( req, res ) => {

        try {
            const u = new Users( req.body );

            u.save( ( err ) => {
                if( err )
                    throw err;

                return res.status( 200 ).json({
                    message: 'User registered successfully!'
                });
            });
        } catch( err ) {
            return res.status( 500 ).json({
                error: err
            });
        }
    });
}