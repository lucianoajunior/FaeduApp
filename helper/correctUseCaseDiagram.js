correctUseCaseDiagram = ( exercise, submission ) => {
	
	const listVerbs = ['Manter', 'Gerenciar', 'Manutenir'];
	const lastLetter = ( str ) => {
		return str.charAt( str.length - 1 );
	};

	const errors = [];
	const e = exercise.json;
	const s = submission.json;

	/**
	 * Correção dos cases.
	 */
	if( e.cases ) {
		if( s.cases ) {
			// Verificamos a quantidade de caso de uso.
			if( e.cases.length != s.cases.length )
				errors.push(`O seu diagrama contém ${s.cases.length} casos de uso, mas o diagrama original contém ${e.cases.length}.`);

			// Percorremos os cases do usuário.
			s.cases.forEach( ( elem ) => {
				let words = elem.nome.split(' ');

				// Verificamos a quantidade de palavras.
				if( words.length < 2 )
					errors.push(`No caso de uso ${elem.nome}, esperava-se que fosse escrito com pelo menos duas palavras. A primeira, um verbo que indique ação e o segundo, o caso em questão.`);

				// Verificamos se o primeira palavra é um verbo.
				if( listVerbs.indexOf( words[0] ) == -1 && lastLetter( words[0] ) != 'r' )
					errors.push(`Esperava-se que a primeira palavra do caso ${elem.nome} fosse um verbo.`);
			});
			
		} else {
			errors.push(`Você não cadastrou nenhum caso de uso. O diagrama original contém ${e.cases.length} casos de uso.`);
		}
	}

	/**
	 * Correção dos atores.
	 */
	if( e.atores ) {
		if( s.atores ) {
			if( e.atores.length != s.atores.length )
				errors.push(`O seu diagrama contém ${s.atores.length} atores, mas o diagrama original contém ${e.atores.length}.`);
		} else {
			errors.push(`Você não cadastrou nenhum ator. O diagrama original contém ${e.atores.length} atores.`);
		}
	}

	/**
	 * Correção dos associações.
	 */
	if( e.associacoes ) {
		if( s.associacoes ) {
			if( e.associacoes.length != s.associacoes.length )
				errors.push(`O seu diagrama contém ${s.associacoes.length} associações, mas o diagrama original contém ${e.associacoes.length}.`);
		} else {
			errors.push(`Você não cadastrou nenhuma associação. O diagrama original contém ${e.associacoes.length} associações.`);
		}
	}

	/**
	 * Correção dos includes.
	 */
	if( e.includes ) {
		if( s.includes ) {
			if( e.includes.length != s.includes.length )
				errors.push(`O seu diagrama contém ${s.includes.length} includes, mas o diagrama original contém ${e.includes.length}.`);
		} else {
			errors.push(`Você não cadastrou nenhum include. O diagrama original contém ${e.includes.length} includes.`);
		}
	}

	/**
	 * Correção dos extends.
	 */
	if( e.extends ) {
		if( s.extends ) {
			if( e.extends.length != s.extends.length )
				errors.push(`O seu diagrama contém ${s.extends.length} extends, mas o diagrama original contém ${e.extends.length}.`);
		} else {
			errors.push(`Você não cadastrou nenhum extends. O diagrama original contém ${e.extends.length} extends.`);
		}
	}

	return errors;
}

module.exports = correctUseCaseDiagram;