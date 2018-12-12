
/**
 * Arrays que terão os objetos relacionados.
 */

let Diagramas       = {};
let UseCases        = [];
let Associations    = [];
let Generalizations = [];
let Actors          = [];
let Includes        = [];
let Extends         = [];
let Annotations     = [];

$('#submissao').on('click', function() {
    $('#correcao').removeClass('selected');
    $(this).addClass('selected');
    carregarJSON( Diagramas.submission.json );    
});

$('#correcao').on('click', function() {
    $('#submissao').removeClass('selected');
    $(this).addClass('selected');
    carregarJSON( Diagramas.exercise.json );
});

function preload() {
    let url = window.location.href;
    let id = url.substring( url.lastIndexOf('/') + 1 );

    fetch('/submissoes/' + id, { method: 'GET' })
    .then( function( response ) {
        if( response.status )
            return response.json();
    }).then( function( response ) {
        carregarJSON( response.submission.json );   
        Diagramas = response;
    });
}

function carregarJSON( json ) {

    UseCases        = [];
    Associations    = [];
    Generalizations = [];
    Actors          = [];
    Includes        = [];
    Extends         = [];
    Annotations     = [];

    if( json.associacoes ) {
        json.associacoes.forEach( function( elem ) {
            Associations.push( new Association( elem.id, elem.de, elem.para ) )
        });
    }

    if( json.atores ) {
        json.atores.forEach( function( elem ) {
            Actors.push( new Actor( elem.id, elem.x, elem.y, elem.nome ) )
        });
    }

    if( json.cases ) {
        json.cases.forEach( function( elem ) {
            UseCases.push( new UseCase( elem.id, elem.x, elem.y, elem.nome ) )
        });
    }

    if( json.includes ) {
        json.includes.forEach( function( elem ) {
            Includes.push( new Include( elem.id, elem.de, elem.para ) )
        });
    }

    if( json.extends ) {
        json.extends.forEach( function( elem ) {
            Extends.push( new Extend( elem.id, elem.de, elem.para ) )
        });
    }

    if( json.observacoes ) {
        json.observacoes.forEach( function( elem ) {
            Annotations.push( new Annotation( elem.id, elem.x, elem.y, elem.descricao ) )
        });
    }
}

/**
 * Inicializamos o canvas principal.
 */
function setup() {
    let canvas = createCanvas( 1140, 500 );
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

/**
 * Desenhamos as linhas do papel.
 */
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