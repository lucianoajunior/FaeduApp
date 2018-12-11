module.exports = ( app ) => {

    const Submissions = app.models.submissions;

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
                    message: "Exercício submetido com sucesso!"
                });
            });
        }
    }
}