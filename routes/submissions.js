module.exports = ( app ) => {
    
    const Submissions = app.controllers.submissions;

    app.route('/submissoes')
        .get( Submissions.index )

    app.route('/submissoes/:id')
        .get( Submissions.asd );
}