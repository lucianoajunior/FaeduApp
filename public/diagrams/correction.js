
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

        sketch.UseCases        = [];
        sketch.Associations    = [];
        sketch.Generalizations = [];
        sketch.Actors          = [];
        sketch.Includes        = [];
        sketch.Extends         = [];
        sketch.Annotations     = [];

        sketch.setup = function() {
            sketch.createCanvas( 1140, 500 ).parent('board-submit');
            sketch.loadJSON( sketch.submission );
        };

        sketch.loadJSON = function( submission ) {

            // Cases
            if( submission.json.cases ) {
                for( var i = 0; i < submission.json.cases.length; i++ ) {
                    var e = submission.json.cases[ i ];
                    sketch.UseCases.push( new UseCase( e.id, e.x, e.y, e.nome ) );
                }
            }

            // Atores
            if( submission.json.atores ) {
                for( var i = 0; i < submission.json.atores.length; i++ ) {
                    var e = submission.json.atores[ i ];
                    sketch.Actors.push( new Actor( e.id, e.x, e.y, e.nome ) );
                }
            }

            // Associações
            if( submission.json.associacoes ) {
                for( var i = 0; i < submission.json.associacoes.length; i++ ) {
                    var e = submission.json.associacoes[ i ];
                    sketch.Associations.push( new Association( e.id, e.de, e.para ) );
                }
            }

            // Includes
            if( submission.json.includes ) {
                for( var i = 0; i < submission.json.includes.length; i++ ) {
                    var e = submission.json.includes[ i ];
                    sketch.Includes.push( new Include( e.id, e.de, e.para ) );
                }
            }

            // Extends
            if( submission.json.extends ) {
                for( var i = 0; i < submission.json.extends.length; i++ ) {
                    var e = submission.json.extends[ i ];
                    sketch.Extends.push( new Extend( e.id, e.de, e.para ) );
                }
            }

            // Annotation
            if( submission.json.observacoes ) {
                for( var i = 0; i < submission.json.observacoes.length; i++ ) {
                    var e = submission.json.observacoes[ i ];
                    sketch.Annotations.push( new Annotation( e.id, e.x, e.y, e.texto ) );
                }
            }
        }
    
        sketch.draw = function() {
            sketch.background('#fff');

            sketch.UseCases.forEach( function( elem ) {
                elem.draw( sketch );
            });
        };
    };
      
    var submit = new p5(s);
    submit.submission = results.submission;
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