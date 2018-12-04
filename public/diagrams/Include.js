class Include {
	constructor( id, from, to ) {
		this.id = id;

		this.from = from;
		this.to = to;

		this.stroke = 2;
		this.size = 10;
		this.color = '#000';

		this.angleArrow = 10;
		this.spaceDotted = 2;
	}

	draw() {
		stroke( this.color );
		strokeWeight( this.stroke );
		
		this.dashedLine( this.x1, this.y1, this.x2, this.y2 );

		noStroke();
		textAlign('center');
		textSize( 14 );

		/**
		 * Aqui eu vou desenhar um arrow na ponta da linha.
		 * Código adaptado da resposta no StackOverflow:
		 * https://stackoverflow.com/questions/44874243/drawing-arrows-in-p5js
		 */
		push();
		let angle = atan2( this.y1 - this.y2, this.x1 - this.x2 );
		translate( this.x2, this.y2 );
		rotate( angle - HALF_PI );
		triangle( -this.angleArrow * 0.5, this.angleArrow, this.angleArrow * 0.5, this.angleArrow, 0, -this.angleArrow / 2 );
		pop();

		text(
			'<<Include>>',
			this.x1 / 2 + this.x2 / 2,
			this.y1 / 2 + this.y2 / 2
		);
	}

	/**
	 * Método para transformar a linha em dashed.
	 * Foi utilizado o algorítmo DDA (em C): http://cheraus.com/code/codes/cgraphics/dda_dashed.php
	 */
	dashedLine( x1, y1, x2, y2 ) {

		var len, dx, dy, x, y;

		dx = abs( x2 - x1 );
		dy = abs( y2 - y1 );

		if( dx >= dy ) {
			len = dx;
		} else {
			len = dy;
		}

		dx = ( x2 - x1 ) / len;
		dy = ( y2 - y1 ) / len;

		x = x1 + 1;
		y = y1 + 1;

		for( var i = 0; i <= len; i++ ) {
			if( i % 9 > this.spaceDotted ) {
				push();
				stroke(0);
				ellipse( x, y, 1 );
				pop();
			}

			x += dx;
			y += dy;
		}
	}

	setPositions( x1, y1, x2, y2 ) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
}