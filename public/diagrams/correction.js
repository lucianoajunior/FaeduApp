
/**
 * Arrays que terão os objetos relacionados.
 */


let url = window.location.href;
let id = url.substring( url.lastIndexOf('/') + 1 );

fetch('/submissoes/' + id, { method: 'GET' })
    .then( function( response ) {
        if( response.status )
            return response.json();
    })
    .then( function( result ) {
        start( result );
    });


function start( results ) {

    var s = function( sketch ) {

        let UseCases        = [];
        let Associations    = [];
        let Generalizations = [];
        let Actors          = [];
        let Includes        = [];
        let Extends         = [];
        let Annotations     = [];

        sketch.setup = function() {
            sketch.createCanvas( 1140, 500 ).parent('board-submit');
        };
    
        sketch.draw = function() {
            sketch.background(0);
            sketch.rect(sketch.x, sketch.y, 50, 50);
        };
    };
      
    var submit = new p5(s);
}



function draw() {
    
}

function lines() {
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