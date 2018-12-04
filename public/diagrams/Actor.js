class Actor {
	constructor( id, x, y, name ) {

		this.id = id;
		this.x = x;
		this.y = y;

		this.offset_x;
		this.offset_y;

		this.locked = false;
		this.hover = false;

		this.name = name;
		this.color = '#000';
		this.size = 30;
	}

	draw() {

		if( ! this.name ) return;
		
		this.hover = this.isOnArea();

		fill( this.color );
		
		noStroke();

		// Cabeça.
		ellipse(
			this.x,
			this.y,
			this.size / 1.2,
			this.size / 1.2
		);
	
		stroke( this.color );
		strokeWeight( this.size / 5 );
	
		// Tronco.
		line(
			this.x,
			this.y,
			this.x,
			( this.y + this.size )
		);
	
		// Braços.
		line(
			this.x - this.size / 2,
			this.y + this.size - ( this.size / 3 ),
			this.x + this.size / 2,
			this.y + this.size - ( this.size / 3 )
		);
	
		// Perna esquerda.
		line( 
			this.x,
			this.y + this.size,
			this.x - this.size / 3,
			this.y + this.size + ( this.size / 2 )
		);
	
		// Perna direita.
		line( 
			this.x,
			this.y + this.size,
			this.x + this.size / 3,
			this.y + this.size + ( this.size / 2 )
		);

		noStroke();
		textAlign('center');
		textSize( this.size / 2 );
		text(
			this.name,
			this.x,
			this.y + this.size * 2.2
		);

	}

	isOnArea() {
		return ( pow( mouseX - this.x, 2 ) + pow( mouseY - this.y, 2 ) ) <= ( pow( this.size / 1.2, 2 ) );
	}

	setName( name ) {
		this.name = name;
	}

	getCenter() {

		console.log( mouseX - this.x );
		console.log( mouseY - this.y );

		return {
			"x": this.x,
			"y": this.y
		};
	}
}