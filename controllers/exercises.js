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
        }
    }
}