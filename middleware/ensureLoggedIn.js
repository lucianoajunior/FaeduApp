ensureLoggedIn = ( options ) => {
	return ( req, res, next ) => {
		if( ! req.session.isLogged || req.session.level != options.level ) {
			req.session.destroy();
			res.redirect( ( options.level == 1 ) ? '/admin' : '/login' );
		}

		// Continues normally.
		next();
	}
}

module.exports = ensureLoggedIn;