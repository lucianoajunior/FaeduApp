module.exports = ( app ) => {
    
    const Users = app.models.users;
    const jwt = require('jsonwebtoken');
    const moment = require('moment');

    app.post('/api/login', ( req, res, next ) => {

        if( ! req.body.email ||
            ! req.body.password ||
            ! req.body.level
        )
            return next( new Error('Required parameters not found') );

        try {
            Users.findOne({
                email: req.body.email,
                password: req.body.password,
                level: req.body.level                
            }, ( err, result ) => {
                
                if( err ) 
                    return next( err );

                if( ! result )
                    return next( new Error('Information not found') );
    
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
            return next( err );
        }
    });

    app.post('/api/logout', ( req, res ) => {
        res.status( 200 ).send({
            auth: false,
            token: null
        });
    });
}