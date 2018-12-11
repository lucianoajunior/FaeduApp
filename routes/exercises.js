module.exports = ( app ) => {
    
    const Exercises = app.controllers.exercises;
    const Submissions = app.controllers.submissions;

    app.route('/exercicios/:id')
        .get( Exercises.author );

    app.route('/exercicios/resolver/:id')
        .get( Exercises.solve )
        .post( Submissions.submit );

    app.route('/correcao/:id')
        .get( Submissions.correct );

    app.route('/seus-exercicios')
        .get( Exercises.yourExercises );

    app.route('/seus-exercicios/caso-de-uso/cadastrar')
        .get( Exercises.registerUseCase )
        .post( Exercises.saveUseCase );

    app.route('/seus-exercicios/excluir/:id')
        .get( Exercises.delete );    
}