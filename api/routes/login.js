module.exports = ( app ) => {
    
    const Users = app.models.users;
    const jwt = require('jsonwebtoken');
    const moment = require('moment');

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

                const data = jwt.verify( token, process.env.SECRET, (err, decoded) => {
                    return decoded;
                });
 
                const dateString = moment.unix( data.exp ).format("YYYY-MM-DD HH:mm:ss");

                return res.status( 200 ).send({
                    auth: true,
                    token: token,
                    expiration: dateString,
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