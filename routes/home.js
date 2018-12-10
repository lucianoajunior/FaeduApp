module.exports = ( app ) => {

    const Home = app.controllers.home;

    app.route('/')
        .get( Home.index );
}