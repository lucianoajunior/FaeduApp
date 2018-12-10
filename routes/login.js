module.exports = ( app ) => {

    const Login = app.controllers.login;

    app.route('/admin')
        .get( ( req, res ) => {
            req.params.level = 1;
            Login.index( req, res );
        })
        .post( Login.authenticate );

    app.route('/login')
        .get( ( req, res ) => {
            req.params.level = 2;
            Login.index( req, res );
        })
        .post( Login.authenticate );

    app.route('/logout').get( Login.logout );
}