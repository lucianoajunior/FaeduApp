class UseCase {
	constructor( id, x, y, name ) {

		this.id = id;
		this.x = x;
		this.y = y;
		this.name = name;

		this.offset_x;
		this.offset_y;

		this.hover = false;
		this.locked = false;

		this.textSize = 15;
		this.stroke = 3;
		this.backgroundColor = '#ff0';
		this.color = '#000';

		this.width = 120;
		this.height = 75;
	}

	draw() {

		if( ! this.name ) return;

		this.hover = this.isOnArea();

		noStroke();

		if( this.hover ) {
			stroke( 0, 0, 0 );
			strokeWeight( this.stroke );
		}
		
		fill( this.backgroundColor );
		ellipse( this.x, this.y, this.width, this.height );

		noStroke();
		textAlign('center');
		textSize( this.textSize );
		fill( this.color );
		text( this.name, this.x, this.y );
	}

	/**
	 * Método para verificar se o cursor (x, y) está dentro dessa ellipse.
	 * https://math.stackexchange.com/questions/76457/check-if-a-point-is-within-an-ellipse/76463
	 * @return {bool}
	 */
	isOnArea() {
		let a = ( pow( mouseX - this.x, 2 ) ) / ( pow( this.width / 2, 2 ) );
		let b = ( pow( mouseY - this.y, 2 ) ) / ( pow( this.height / 2, 2 ) );
		return( a + b <= 1 );
	}

	setName( name ) {
		this.name = name;
	}

	/**
	 * Método para retornar o centro do Use Case.
	 */
	getCenter() {
		return {
			'x': this.x,
			'y': this.y
		};
	}
}