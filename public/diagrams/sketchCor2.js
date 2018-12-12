
/**
 * Arrays que terão os objetos relacionados.
 */

let Diagramas       = {};
let Classes         = [];
let Associations    = [];

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

        console.log( Diagramas );
    });
}

function carregarJSON( json ) {

    Classes        = [];
    Associations    = [];

    console.log( json );

    if( json.classes ) {
        json.classes.forEach( function( elem ) {

            var a = new Classe( elem.id, elem.x, elem.y, elem.nome );

            a.setHeight( elem.altura );

            if( elem.atributos ) {
                elem.atributos.forEach( function( asd ) {
                    a.pushVar( asd );
                });
            }

            if( elem.metodos ) {
                elem.metodos.forEach( function( asd ) {
                    a.pushMethod( asd );
                });
            }

            Classes.push( a );
        });
    }

    if( json.associacoes ) {
        json.associacoes.forEach( function( elem ) {
            Associations.push( new Association( elem.id, elem.de, elem.para ) )
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

    Associations.forEach( function( obj ) {
        
        let x1, y1, x2, y2;

        Classes.forEach( function( classe ) {
            if( classe.id == obj.from ) {
                x1 = classe.getCenter().x;
                y1 = classe.getCenter().y;
            }
        });
        
        Classes.forEach( function( classe ) {
            if( classe.id == obj.to ) {
                x2 = classe.getCenter().x;
                y2 = classe.getCenter().y;
            }
        });

        obj.setPositions( x1, y1, x2, y2 );
        obj.draw();
    });

    Classes.forEach( function( obj ) {
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