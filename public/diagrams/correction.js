
/**
 * Arrays que terão os objetos relacionados.
 */
let UseCases        = [];
let Associations    = [];
let Generalizations = [];
let Actors          = [];
let Includes        = [];
let Extends         = [];
let Annotations     = [];

let url = window.location.href;
let id = url.substring( url.lastIndexOf('/') + 1 );

fetch('/submissoes/' + id, { method: 'GET' })
    .then( function( response ) {
        if( response.status )
            return response.json();
    })
    .then( function( result ) {
        start();
    });

var s = function( sketch ) {

    sketch.setup = function() {
        sketch.createCanvas( 1140, 500 ).parent('board-submit');
    };

    sketch.draw = function() {
        sketch.background(0);
        sketch.rect(sketch.x, sketch.y, 50, 50);
    };
};
  
var myp5 = new p5(s);
myp5.data = ['luciano'];


function start() {
    alert( 123 );
}


function preload() {
    
    

    
}

function draw() {
    background('#fff');
    lines();

    UseCases.forEach( function( obj ) {
        sys.checkX( obj.x );
        sys.checkY( obj.y );
        obj.draw();
    });

    Associations.forEach( function( obj ) {
        
        let x1, y1, x2, y2;

        Actors.forEach( function( actor ) {
            if( actor.id == obj.from ) {
                x1 = actor.getCenter().x;
                y1 = actor.getCenter().y;
            }
        });
        
        UseCases.forEach( function( useCase ) {
            if( useCase.id == obj.to ) {
                x2 = useCase.getCenter().x;
                y2 = useCase.getCenter().y;
            }
        });

        obj.setPositions( x1, y1, x2, y2 );
        obj.draw();
    });

    Includes.forEach( function( obj ) {

        let x1, y1, x2, y2;

        UseCases.forEach( function( useCase ) {
            if( useCase.id == obj.from ) {
                x1 = useCase.getCenter().x;
                y1 = useCase.getCenter().y;
            } else if( useCase.id == obj.to ) {
                x2 = useCase.getCenter().x;
                y2 = useCase.getCenter().y;
            }
        });

        obj.setPositions( x1, y1, x2, y2 );
        obj.draw();
    });

    Extends.forEach( function( obj ) {

        let x1, y1, x2, y2;
        
        UseCases.forEach( function( useCase ) {
            if( useCase.id == obj.from ) {
                x1 = useCase.getCenter().x;
                y1 = useCase.getCenter().y;
            } else if( useCase.id == obj.to ) {
                x2 = useCase.getCenter().x;
                y2 = useCase.getCenter().y;
            }
        });

        obj.setPositions( x1, y1, x2, y2 );
        obj.draw();
    });

    Actors.forEach( function( obj ) {
        sys.checkX( obj.x );
        sys.checkY( obj.y );
        obj.draw();
    });

    Annotations.forEach( function( obj ) {
        sys.checkX( obj.x );
        sys.checkY( obj.y );
        obj.draw();
    });
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