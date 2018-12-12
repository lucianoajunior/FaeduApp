module.exports = ( app ) => {

    const Submissions = app.models.submissions;
    const Exercises = app.models.exercises;

    const correctUseCaseDiagram = require('../helper/correctUseCaseDiagram');
    const correctClassDiagram = require('../helper/correctClassDiagram');

    return {
        index: ( req, res, next ) => {

            Submissions.find({
                author: req.session._id
            })
            .populate({
                path: 'exercise',
                populate: {
                    path: 'author',
                    model: 'User'
                }
            })
            .populate('author')
            .exec( ( err, result ) => {

                if( err )
                    return next( err );
                
                res.render('submissions/index', {
                    title: 'Suas submissões',
                    submissions: result
                });
            });               
        },
        submit: ( req, res, next ) => {

            const params = {
                author: req.session._id,
                exercise: req.body.id,
                json: JSON.parse( req.body.json )
            };

            s = new Submissions( params );

            s.save( ( err ) => {
                if( err )
                    return next( err );

                res.status( 200 ).json({
                    status: true,
                    id: s._id,
                    message: "Exercício submetido com sucesso!"
                });
            });
        },
        correct: ( req, res, next ) => {

            Submissions.findOne({
                _id: req.params.id
            })
            .then( ( submission, err ) => {
                
                if( err )
                    return next( err );

                Exercises.findOne({
                    _id: submission.exercise
                })
                .then( ( exercise, err ) => {
                    
                    if( err )
                        return next( err );

                    let correction = ( exercise.type == 1 )
                        ? correctUseCaseDiagram( exercise, submission )
                        : correctClassDiagram( exercise, submission );

                    const f = (  exercise.type == 1 ) ? 'correct' : 'correctClasse';
                    res.render('submissions/' + f, {
                        exercise: exercise,
                        submission: submission,
                        errors: correction
                    });
                });
            });
        },
        details: ( req, res, next ) => {

            Submissions.findOne({
                _id: req.params.id
            })
            .then( ( submission, err ) => {
                
                if( err )
                    return next( err );

                Exercises.findOne({
                    _id: submission.exercise
                })
                .then( ( exercise, err ) => {
                    
                    if( err )
                        return next( err );

                    return res.status( 200 ).json({
                        exercise: exercise,
                        submission: submission
                    });
                });
            });
        }
    }
}