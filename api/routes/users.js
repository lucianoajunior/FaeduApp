module.exports = ( app ) => {
    
    const Users = app.models.users;
    const VerifyToken = require('../middleware/VerifyToken');

    // Register a new user.
    app.post('/api/users', ( req, res, next ) => {

        const u = new Users( req.body );

        u.save( ( err ) => {

            if( err ) return next( err );          

            return res.status( 200 ).json({
                status: true,
                message: 'User registered successfully!'
            });
        });
    });

    // Listando todos os usuários.
    app.get('/api/users', VerifyToken, ( req, res, next ) => {

        Users.find({
            $or: [
                {
                    name: new RegExp( req.query.s )
                }, {
                    organization: new RegExp( req.query.s )
                }, {
                    email: new RegExp( req.query.s )
                }
            ],
            level: req.query.level || 2
        }, ( err, data ) => {

            if( err ) return next( err );

            return res.status( 200 ).json( data );
        });
    });

    // Return an user by id.
    app.get('/api/users/:id', VerifyToken, ( req, res, next ) => {

        Users.findOne({
            _id: req.params.id
        }, ( err, data ) => {

            if( err ) return next( err );
           
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

            if( err ) return next( err );

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

            if( err ) return next( err );

            return res.status( 200 ).json({
                status: true,
                message: "User successfully removed!"
            });
        });
    });
}