correctClassDiagram = ( exercise, submission ) => {

	const errors = [];
	const e = exercise.json;
	const s = submission.json;

	if( e.classes.length !== s.classes.length )
		errors.push(`O seu diagrama contém ${s.classes.length} classes, mas o diagrama original contém ${e.classes.length}.`);

	let totalAtributosExercicio = 0;
	let totalAtributosSubmissao = 0;
	let totalMetodosExercicio = 0;
	let totalMetodosSubmissao = 0;	

	e.classes.forEach( ( elem ) => {
		if( elem.atributos )
			totalAtributosExercicio += elem.atributos.length;

		if( elem.metodos )
			totalMetodosExercicio += elem.metodos.length;
	});

	s.classes.forEach( ( elem ) => {
		if( elem.atributos )
			totalAtributosSubmissao += elem.atributos.length;

		if( elem.metodos )
			totalMetodosSubmissao += elem.metodos.length;
	});

	if( totalAtributosExercicio != totalAtributosSubmissao )
		errors.push(`As quantidades dos atributos nas classes não são as mesmas. O exercício original contém ${totalAtributosExercicio} e o seu diagrama contém ${totalAtributosSubmissao}`);

	if( totalMetodosExercicio != totalMetodosSubmissao )
		errors.push(`As quantidades dos métodos nas classes não são as mesmas. O exercício original contém ${totalMetodosExercicio} e o seu diagrama contém ${totalMetodosSubmissao}`);

	if( e.associacoes ) {
		if( s.associacoes ) {

			if( e.associacoes.length != s.associacoes.length )
				errors.push(`O seu diagrama contém ${s.associacoes.length} associações, mas o diagrama original contém ${e.associacoes.length}.`);

		} else {
			errors.push(`O seu diagrama não contém nenhuma associação, enquanto que o diagrama original contém ${e.associacoes.length}.`);
		}
	}

	return errors;
}

module.exports = correctClassDiagram;