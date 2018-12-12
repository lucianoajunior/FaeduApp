
/**
 * Arrays que terão os objetos relacionados.
 */
let EUseCases        = [];
let EAssociations    = [];
let EGeneralizations = [];
let EActors          = [];
let EIncludes        = [];
let EExtends         = [];
let EAnnotations     = [];

let SUseCases        = [];
let SAssociations    = [];
let SGeneralizations = [];
let SActors          = [];
let SIncludes        = [];
let SExtends         = [];
let SAnnotations     = [];

var s = function( p ) { // p could be any variable name
    var x = 100; 
    var y = 100;
    p.setup = function() {
      p.createCanvas(400, 200).parent('board-correction');
    };
  
    p.draw = function() {
      p.background(0);
      p.fill(255);
      p.rect(x,y,50,50);
    };
  };
  var myp5 = new p5(s, 'c1');


function preload() {
    
    let url = window.location.href;
    let id = url.substring( url.lastIndexOf('/') + 1 );

    fetch('/submissoes/' + id, { method: 'GET' })
    .then( function( response ) {
        if( response.status )
            return response.json();
    })
    .then( function( result ) {

        // Cadastramos os do exercício.
        if( result.exercise.json.atores ) {
            result.exercise.json.atores.forEach( function( elem ) {
                EActors.push( new Actor( elem.id, elem.x, elem.y, elem.nome ) );
            });
        }

        if( result.exercise.json.cases ) {
            result.exercise.json.cases.forEach( function( elem ) {
                EUseCases.push( new UseCase( elem.id, elem.x, elem.y, elem.nome ) );
            });
        }

        if( result.exercise.json.associacoes ) {
            result.exercise.json.associacoes.forEach( function( elem ) {
                EAssociations.push( new Association( elem.id, elem.de, elem.para ) );
            });
        }

        if( result.exercise.json.includes ) {
            result.exercise.json.includes.forEach( function( elem ) {
                EIncludes.push( new Include( elem.id, elem.de, elem.para ) );
            });
        }

        if( result.exercise.json.extends ) {
            result.exercise.json.extends.forEach( function( elem ) {
                EExtends.push( new Extend( elem.id, elem.de, elem.para ) );
            });
        }

        if( result.exercise.json.observacoes ) {
            result.exercise.json.observacoes.forEach( function( elem ) {
                EAnnotations.push( new Annotation( elem.id, elem.x, elem.y, elem.descricao ) );
            });
        }

        //
        if( result.submission.json.atores ) {
            result.submission.json.atores.forEach( function( elem ) {
                SActors.push( new Actor( elem.id, elem.x, elem.y, elem.nome ) );
            });
        }

        if( result.submission.json.cases ) {
            result.submission.json.cases.forEach( function( elem ) {
                SUseCases.push( new UseCase( elem.id, elem.x, elem.y, elem.nome ) );
            });
        }

        if( result.submission.json.associacoes ) {
            result.submission.json.associacoes.forEach( function( elem ) {
                SAssociations.push( new Association( elem.id, elem.de, elem.para ) );
            });
        }

        if( result.submission.json.includes ) {
            result.submission.json.includes.forEach( function( elem ) {
                SIncludes.push( new Include( elem.id, elem.de, elem.para ) );
            });
        }

        if( result.submission.json.extends ) {
            result.submission.json.extends.forEach( function( elem ) {
                SExtends.push( new Extend( elem.id, elem.de, elem.para ) );
            });
        }

        if( result.submission.json.observacoes ) {
            result.submission.json.observacoes.forEach( function( elem ) {
                SAnnotations.push( new Annotation( elem.id, elem.x, elem.y, elem.descricao ) );
            });
        }

    });
}

/**
 * Inicializamos o canvas principal.
 */
function setup() {
    
    let canvas = createCanvas( 1140, 500 );
    canvas.parent('board-submit');

    leftBuffer = createGraphics( 570, 500 );
    rightBuffer = createGraphics( 570, 500 );

    sys = new Sys( displayWidth, displayHeight );
}

function draw() {
    
    background('#fff');
    lines();

    drawLeftBuffer();
    drawRightBuffer();

    image(leftBuffer, 0, 0);
    image(rightBuffer,  570, 0);
}

function drawLeftBuffer() {

    EUseCases.forEach( function( obj ) {
        sys.checkX( obj.x );
        sys.checkY( obj.y );
        obj.draw();
    });

    EAssociations.forEach( function( obj ) {
        
        let x1, y1, x2, y2;

        EActors.forEach( function( actor ) {
            if( actor.id == obj.from ) {
                x1 = actor.getCenter().x;
                y1 = actor.getCenter().y;
            }
        });
        
        EUseCases.forEach( function( useCase ) {
            if( useCase.id == obj.to ) {
                x2 = useCase.getCenter().x;
                y2 = useCase.getCenter().y;
            }
        });

        obj.setPositions( x1, y1, x2, y2 );
        obj.draw();
    });

    EIncludes.forEach( function( obj ) {

        let x1, y1, x2, y2;

        EUseCases.forEach( function( useCase ) {
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

    EExtends.forEach( function( obj ) {

        let x1, y1, x2, y2;
        
        EUseCases.forEach( function( useCase ) {
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

    EActors.forEach( function( obj ) {
        sys.checkX( obj.x );
        sys.checkY( obj.y );
        obj.draw();
    });

    EAnnotations.forEach( function( obj ) {
        sys.checkX( obj.x );
        sys.checkY( obj.y );
        obj.draw();
    });
}

function drawRightBuffer() {
    SUseCases.forEach( function( obj ) {
        sys.checkX( obj.x );
        sys.checkY( obj.y );
        obj.draw();
    });

    SAssociations.forEach( function( obj ) {
        
        let x1, y1, x2, y2;

        SActors.forEach( function( actor ) {
            if( actor.id == obj.from ) {
                x1 = actor.getCenter().x;
                y1 = actor.getCenter().y;
            }
        });
        
        SUseCases.forEach( function( useCase ) {
            if( useCase.id == obj.to ) {
                x2 = useCase.getCenter().x;
                y2 = useCase.getCenter().y;
            }
        });

        obj.setPositions( x1, y1, x2, y2 );
        obj.draw();
    });

    SIncludes.forEach( function( obj ) {

        let x1, y1, x2, y2;

        SUseCases.forEach( function( useCase ) {
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

    SExtends.forEach( function( obj ) {

        let x1, y1, x2, y2;
        
        SUseCases.forEach( function( useCase ) {
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

    SActors.forEach( function( obj ) {
        sys.checkX( obj.x );
        sys.checkY( obj.y );
        obj.draw();
    });

    SAnnotations.forEach( function( obj ) {
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