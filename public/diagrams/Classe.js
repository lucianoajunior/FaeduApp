class Classe {
    constructor( id, x, y, name ){
        this.backGroundColor = "#fff266";

        this.width = 200;
        this.height = 50;

        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;

        this.attributes = [];
        this.methods = [];

        this.hover = false;
		this.locked = false;

        this.paddingToName = 20;
        this.paddingToLine = 30;

        this.paddingToRow = 30;

        this.indicator = false;

        this.buttonVar = false;
        this.buttonMethod = false;

        this.lastY;

        this.paddingMethods = 0;
        this.teste = 20;
    }

    draw() {

        if(!this.name) return;

        this.hover = this.isOnArea();
        this.buttonVar = this.isOnButtonVar();
        this.buttonMethod = this.isOnButtonMethod();

        push();
        
        color('red');
        fill(this.backGroundColor);

        strokeWeight( 1 );
        stroke("#000000");

        rect(this.x, this.y, this.width, this.height + 30 );
        fill("#000000");

        var textX = (this.x + this.width / 2 );
        var textY = this.y + this.paddingToName;

        noStroke();
        textAlign(CENTER);
        text( this.name,textX,textY );
        textSize( 15 );
       

        strokeWeight( 1 );
        stroke("#000000");

        line( this.x, this.y + this.paddingToLine, this.x + this.width, this.y + this.paddingToLine);

        fill("#007bff");        
        rect( this.x + this.width - 30, textY, 30, 20 );

        for( var i = 0; i < this.attributes.length; i++ ) {
            var attr = this.attributes[ i ];
            noStroke();
            fill("black");
            textAlign(LEFT);
            text( attr.name + ":" + attr.type, this.x + 10, this.y + attr.y );
        }
        
        fill("#007bff");
        rect( this.x + this.width - 30, textY + this.teste, 30, 20 );

        for( var i = 0; i < this.methods.length; i++ ) {
            var attr = this.methods[ i ];
            noStroke();
            fill("black");
            textAlign(LEFT);
            text( attr.name + "(): " + attr.retorno, this.x + 10, this.paddingMethods + this.y + attr.y );
        }

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

    isOnButtonVar() {

        if(
            mouseX >= this.x + this.width - 30 &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y + this.paddingToLine - 10 &&
            mouseY <= this.y + this.paddingToLine + 10
        ) {
            return true;
        }

        return false;
    }

    isOnButtonMethod() {

        if(
            mouseX >= this.x + this.width - 30 &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y + this.teste + 20
        ) {
            return true;
        }

        return false;
    }

    addVar() {
        let name = prompt('Digite o nome:');
        let type = prompt('Digite o tipo:');

        this.attributes.push({
            name: name,
            type: type,
            y: this.height
        });

        this.height += 20;
        this.paddingMethods += 20;
        this.teste += 20;
    }

    addMethod() {
        let name = prompt('Digite o método:');
        let retorno = prompt('Digite o retorno do método:');

        this.methods.push({
            name: name,
            retorno: retorno,
            y: this.height
        });

        this.height += 20;
        
    }

    pushVar( elem ) {
        this.attributes.push( elem );
    }

    pushMethod( elem ) {
        this.methods.push( elem );
    }

    setHeight( height ) {
        this.height = height;
    }
}