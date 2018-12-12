//Array que guardará os objetos classe em cena
var classes = [];
var classesForLine = [];
var lines = []
var notations = [];

//Diz se está ocorrendo drag ou não. Isso é necessário para não confundir com click.
var dragging = false;

var buttons = []

var Flag = {
    NEWCLASS : 1,
    NEWRELATIONSHIP: 2,
    SELECTANDMOVE: 3,
    NEWNOTATION: 4
}

var action = Flag.SELECTANDMOVE;

function setup(){
    let board = document.getElementById('board');
    let canvas = createCanvas( board.offsetWidth, 450 );
    canvas.mouseReleased( mouseClickedEvent );
    canvas.parent('board');

    sys = new Sys( displayWidth, displayHeight );

    setupButtons();
}

function setupButtons(){
    var pointer = document.getElementsByName("pointer")[0];
    var classe = document.getElementsByName("class")[0];
    var relationship = document.getElementsByName("relationship")[0];

    var buttons = [pointer, classe, relationship];

    pointer.onclick = () => {
        action = Flag.SELECTANDMOVE;
        console.log("Pointer");
    };

    classe.onclick = () => {
        action = Flag.NEWCLASS;
        console.log("Classe");
    };

    relationship.onclick = () => {
        action = Flag.NEWRELATIONSHIP;
        console.log("Relationship");
    };
}

function mouseClickedEvent(){
    switch( action ) {
        case Flag.NEWCLASS:
            createClass();    
            break;
        case Flag.SELECTANDMOVE:
            verifyClick();
            break;
    }
}

function draw(){
 
    background('#fff');
    drawLines();
    
    classes.forEach(c => {
        c.draw();
    });

    lines.forEach(l => {
        l.draw();
    });
}


function keyPressed() {
    console.log(keyCode);
    if (keyCode == 46) {
      for(var i = 0; i < classes.length; i++){
        if(classes[i].indicator){
            classes.splice(i,1);
        }
      }
    }else if(keyCode = 76){
        if(classesForLine.length > 2){
            lines.push(new Line(classesForLine[0], classesForLine[1]));
        }
    }
} 

function mouseDragged(){
    //verifyClick();
    dragging = true;
    //console.log("Dragged...");
    classes.forEach(c => {
        if(c.indicator == true && c.wasClicked(mouseX, mouseY)){
            c.x = mouseX - c.width/2;
            c.y = mouseY - c.height/2;
        }
    });
}

function isElementOnArea(x,y){
    var selected = false;
    var index = null;
    for(var i = 0; i < classes.length; i++){
        if(classes[i].isClicked(x, y)){
            selected = true;
            index = i;
        }
    }
    if(selected){
        for(var i = 0; i < classes.length; i++){
            if(i != index){
                classes[i].indicator = false;
            }
        }
    }
    
    return selected;
}

function wichElementIsOnArea(){
    var result = [];
    for(var i = 0; i < classes.length; i++){
        if(classes[i].isClicked(mouseX, mouseY)){
            result.push(classes[i]);
            result.push(i);
        }
    }
        
    return result;
}

function drawLines() {
    let gapSize = 40;
    let numColumns = displayWidth / gapSize;
    let numRows = displayHeight / gapSize;
    let x = 0;
    let y = 0;

    strokeWeight( 1 );
    stroke("#eaeaea");

    for( let i = 0; i < numRows; i++ ) {
        y += gapSize;
        line( 0, y, displayWidth, y );
    }
 
    for( let i = 0; i < numColumns; i++){
        x += gapSize;
        line( x, 0, x, displayHeight );
    }
}

function verifyClick(){
    console.log("VerifyClick");
    classes.forEach(c => {
        c.wasClicked(mouseX, mouseY);
    });
}

function createClass(){
    classes.push(new Classe(mouseX, mouseY));
}
