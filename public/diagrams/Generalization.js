class Generalization {
	constructor( id, x1, y1, x2, y2 ) {
		this.id = id;
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.stroke = 4;
		this.color = '#000';
	}

	draw() {
		stroke( this.color );
		strokeWeight( this.stroke );
		line( this.x1, this.y1, this.x2, this.y2 );
	}
}