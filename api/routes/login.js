module.exports = ( app ) => {
    
    const Users = app.models.users;
    const jwt = require('jsonwebtoken');

    app.post('/api/login', ( req, res ) => {

        try {
            Users.findOne({
                email: req.body.email,
                password: req.body.password,
                level: req.body.level                
            }, ( err, result ) => {
                
                if( err ) {
                    return res.status( 403 ).json({
                        message: 'Bad request'
                    });
                }                    

                if( ! result ) {
                    return res.status( 404 ).json({
                        message: 'Information not found'
                    });
                }                   
    
                const id = result._id;
                const token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 84600
                });

                return res.status( 200 ).send({
                    auth: true,
                    token: token,
                    level: result.level,
                    id: result._id
                });
            });
        } catch( err ) {
            return res.status( 500 ).json( err );
        }
    });

    app.post('/api/logout', ( req, res ) => {
        res.status( 200 ).send({
            auth: false,
            token: null
        });
    });
}