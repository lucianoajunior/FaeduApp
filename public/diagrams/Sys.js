class Sys {
	constructor( width, height ) {
		this.width = width;
        this.height = height;

        this.id = 1;

        this.minX = displayWidth;
        this.maxX = 0;
        this.minY = displayHeight;
        this.maxY = 0;

        this.marginX = 1.75;
        this.marginY = 2.5;
    }
    
    getID() {
        return this.id++;
    }

    checkX( x ) {
        if( x < this.minX ) this.minX = x;
        if( x > this.maxX ) this.maxX = x;
    }

    checkY( y ) {
        if( y < this.minY ) this.minY = y;
        if( y > this.maxY ) this.maxY = y;
    }

    getResolution() {
        return {
            "width": parseInt( ( this.maxX - this.minX ) * this.marginX ),
            "height": parseInt( ( this.maxY - this.minY ) * this.marginY )
        };
    }
}