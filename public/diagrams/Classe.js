class Classe {
    constructor( id, x, y, name ){
        this.backGroundColor = "#fff266";
        this.minWidth = 200;
        this.minHeight = 150;
        this.width = this.minWidth;
        this.height = this.minHeight;

        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;

        this.attributes = {};
        this.methods = {};

        this.hover = false;
		this.locked = false;

        this.paddingToName = 20;
        this.paddingToLine = 30;
        this.indicator = false;
    }

    draw() {

        if(!this.name) return;

        this.hover = this.isOnArea();

        push();
        noStroke();
        color('red');
        fill(this.backGroundColor);
        rect(this.x, this.y, this.width, this.height);
        fill("#000000");

        var textX = (this.x + this.width / 2 );
        var textY = this.y + this.paddingToName;

        textAlign(CENTER);
        text( this.name,textX,textY );
        textSize( 15 );

        fill("red");
        rect( this.x + this.width - 30, textY, 30, 20 );
        

        strokeWeight( 1 );
        stroke("#000000");

        line( this.x, this.y + this.paddingToLine, this.x + this.width, this.y + this.paddingToLine);
        pop();
    }

    getCenter() {
		return {
			"x": this.x + this.width / 2,
			"y": this.y + this.height / 2
		};
    }
    
    isOnArea() {

        if(
            mouseX >= this.x && mouseX <= this.width + this.x &&
            mouseY >= this.y && mouseY <= this.height + this.y
        )
            return true;

        return false;
    }
}