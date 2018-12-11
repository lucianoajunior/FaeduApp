module.exports = ( app ) => {
    
    const Users = app.controllers.users;

    app.route('/usuarios/registrar')
        .get( Users.registerStudent )
        .post( Users.insert );

    app.route('/professores')
        .get( Users.teachers );
}