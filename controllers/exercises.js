module.exports = ( app ) => {

    const Exercises = app.models.exercises;

    return {
        author: ( req, res, next ) => {
            Exercises.find({
                author: req.params.id
            })
            .exec( ( err, result ) => {
                if( err )
                    return next( err );

                res.render('exercises/index', {
                    exercises: result
                });
            });
        },
        solve: ( req, res, next ) => {

            Exercises.findOne({
                _id: req.params.id
            }, ( err, result ) => {

                console.log( result );

                if( err )
                    return next( err );

                const view = ( result.type == 1 ) ? 'usecase' : 'class';

                res.render("diagrams/" + view, {
                    exercise: result
                });
            });
        },
        yourExercises: ( req, res, next ) => {

            Exercises.find({
                author: req.session._id
            }, ( err, result ) => {

                if( err )
                    return next( err );

                res.render('exercises/yourExercises', {
                    exercises: result
                });
            });
        },
        registerUseCase: ( req, res ) => {
            res.render('exercises/registerUseCase', {
                author: req.session._id,
                type: 1
            });
        },
        saveUseCase: ( req, res, next ) => {

            const data = {
                author: req.body.author,
                type: req.body.type,
                title: req.body.title,
                description: req.body.description,
                json: JSON.parse( req.body.json )
            };

            const e = new Exercises( data );

            e.save( ( err ) => {
                if( err )
                    return next( err );

                res.status( 200 ).json({
                    status: true   
                });
            });
        },
        delete: ( req, res ) => {

            Exercises.remove({
                _id: req.params.id
            }, ( err ) => {

                if( err )
                    return next( err );

                res.redirect('/seus-exercicios');
            });

        }
    }
}