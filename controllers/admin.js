module.exports = ( app ) => {

    const Users = app.models.users;
    const Exercises = app.models.exercises;
    const Submissions = app.models.submissions;

    return {
        index: ( req, res, next ) => {
            Promise.all([
                Users.count({ level:2 }).exec(),
                Users.count({ level:3 }).exec(),
                Exercises.count().exec(),
                Submissions.count().exec()
            ]).then( ( counts ) => {
                
                res.render('admin/index', {
                    teachers: counts[0],
                    students: counts[1],
                    exercises: counts[2],
                    submissions: counts[3]
                });
            }).catch( err => {
                return next( err );
            });
        }
    }
}