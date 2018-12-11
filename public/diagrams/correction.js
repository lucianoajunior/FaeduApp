
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

function preload() {
    console.log('entrou');

    fetch('/submissoes/asdasd', {
        method: 'GET'
    })
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      if(data) {
        // create a circle at the x, y coords
        myCircle = new Circle(data.x, data.y);
      }
      else {
        myCircle = new Circle(0, 0);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

/**
 * Inicializamos o canvas principal.
 */
function setup() {
    let board = document.getElementById('board');
    let canvas = createCanvas( 500, 500 );
    canvas.mouseReleased( mouseClickedEvent );
    canvas.parent('board-submit');

    sys = new Sys( displayWidth, displayHeight );
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