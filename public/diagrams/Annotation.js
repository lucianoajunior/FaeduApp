class Annotation {
	constructor( id, x, y, text ) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.text = text;
		this.size = 18;
	}

	draw() {

		if( ! this.text ) return;

		noStroke();
		textAlign('left');
		textSize( this.size );
		text( this.text, this.x, this.y	);
	}
}