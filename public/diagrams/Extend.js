class Extend {
	constructor( id, from, to ) {
		this.id = id;

		this.from = from;
		this.to = to;

		this.stroke = 2;
		this.size = 10;
		this.color = '#000';
	}

	draw() {
		stroke( this.color );
		strokeWeight( this.stroke );
		
		line( this.x1, this.y1, this.x2, this.y2 );

		noStroke();
		textAlign('center');
		textSize( 14 );

		text(
			'<< Extend >>',
			this.x1 / 2 + this.x2 / 2,
			this.y1 / 2 + this.y2 / 2
		);
	}

	setPositions( x1, y1, x2, y2 ) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
}