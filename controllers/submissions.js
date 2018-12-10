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
        }
    }
}