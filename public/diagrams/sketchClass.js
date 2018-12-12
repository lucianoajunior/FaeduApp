/**
 * Arrays que terão os objetos relacionados.
 */

let idDiagrama = null;
let sys;

let Classes        = [];
let Associations    = [];

/**
 * Objeto com todas as ações possíveis no programa.
 * Sempre um índice desse array terá true para determinar o que o usuário está criando.
 */
let Actions = {
    'pointer': false,
    'class': false,
    'association': false
};

/**
 * Variáveis auxiliares.
 */
let temp = [];
let dragging = false;

/**
 * Inicializamos o canvas principal.
 */
function setup() {
    let board = document.getElementById('board');
    let canvas = createCanvas( board.offsetWidth, 500 );
    canvas.mouseReleased( mouseClickedEvent );
    canvas.parent('board');

    sys = new Sys( displayWidth, displayHeight );
}

function mouseClickedEvent() {

    Object.keys( Actions ).forEach( function( action ) {

        if( ! Actions[ action ] ) return;
        
        if( action == 'class' ) {
            let name = prompt('Digite o nome da classe:');
            if( ! name ) return;

            Classes.push( new Classe( sys.getID(), mouseX, mouseY, name ) );
            return;
        }

        if( action == 'association' ) {
            
            let id = null;

            Classes.forEach( function( obj ) {
                if( obj.hover )
                    id = obj.id;
            });

            if( id == null ) {
                alert('Você precisa selecionar uma classe.');
                return;
            }

            if( temp.length == 0 ) {                              
                temp.push( id );
            } else {
                Associations.push(
                    new Line(
                        sys.getID(),
                        temp[0],
                        id
                    )
                );

                console.log( Associations );

                temp = [];
            }

            return;
        }
    });
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

function mousePressed() {
    Classes.forEach( function( obj ) {
        obj.locked = ( obj.hover ) ? true : false;
        obj.offset_x = mouseX - obj.x;
        obj.offset_y = mouseY - obj.y;
    });
}

function mouseDragged() {
    dragging = true;

    Classes.forEach( function( obj ) {
        if( obj.locked ) {
            obj.x = mouseX - obj.offset_x;
            obj.y = mouseY - obj.offset_y;
        }
    });
}

function mouseReleased() {
    Classes.forEach( function( obj ) {
        obj.locked = false;
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

function changeAction( action ) {
    Object.keys( Actions ).forEach( function( key ) {
        Actions[ key ] = ( key == action ) ? true : false;
        document.getElementById( key ).classList.remove('selected');        
        if( key == action ) document.getElementById( action ).className += ' selected';
    });
}