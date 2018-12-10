module.exports = ( app ) => {

    const Admin = app.controllers.admin;
    const Users = app.controllers.users;
    const ensureLoggedIn = require('../middleware/ensureLoggedIn');

    app.all("/admin/*", ensureLoggedIn({
        level: 1
    }));

    app.route('/admin/painel')
        .get( Admin.index );

    app.route('/admin/professores')
        .get( Users.index );

    app.route('/admin/professores/cadastrar')
        .get( Users.register )
        .post( Users.insert );

    app.route('/admin/professores/visualizar/:id')
        .get( Users.view );

    app.route('/admin/professores/editar/:id')
        .get( Users.edit )
        .post( Users.update );

    app.route('/admin/professores/remover/:id')
        .get( Users.delete );
}