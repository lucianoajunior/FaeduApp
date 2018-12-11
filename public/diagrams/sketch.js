
/**
 * Arrays que terão os objetos relacionados.
 */

let idDiagrama = null;
let sys;

let UseCases        = [];
let Associations    = [];
let Generalizations = [];
let Actors          = [];
let Includes        = [];
let Extends         = [];
let Annotations     = [];

/**
 * Objeto com todas as ações possíveis no programa.
 * Sempre um índice desse array terá true para determinar o que o usuário está criando.
 */
let Actions = {
    'pointer': false,
    'usecase': false,
    'actor': false,
    'association': false,
    'annotation': false,
    'include': false,
    'extend': false
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
    let canvas = createCanvas( board.offsetWidth, board.offsetHeight );
    canvas.mouseReleased( mouseClickedEvent );
    canvas.parent('board');

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

function mousePressed() {
    UseCases.forEach( function( obj ) {
        obj.locked = ( obj.hover ) ? true : false;
        obj.offset_x = mouseX - obj.x;
        obj.offset_y = mouseY - obj.y;
    });

    Actors.forEach( function( obj ) {
        obj.locked = ( obj.hover ) ? true : false;
        obj.offset_x = mouseX - obj.x;
        obj.offset_y = mouseY - obj.y;
    });
}

function mouseDragged() {
    dragging = true;

    UseCases.forEach( function( obj ) {
        if( obj.locked ) {
            obj.x = mouseX - obj.offset_x;
            obj.y = mouseY - obj.offset_y;
        }
    });

    Actors.forEach( function( obj ) {
        if( obj.locked ) {
            obj.x = mouseX - obj.offset_x;
            obj.y = mouseY - obj.offset_y;
        }
    });
}

/**
 * Ao retirar o mouse, setamos o atributo de locked
 * como falso em todos os os Use Cases.
 */
function mouseReleased() {
    UseCases.forEach( function( obj ) {
        obj.locked = false;
    });

    Actors.forEach( function( obj ) {
        obj.locked = false;
    });
}

/**
 * Ao clicarmos no canvas, verificamos qual ação vamos criar.
 */
function mouseClickedEvent() {

    Object.keys( Actions ).forEach( function( action ) {

        // Se a ação não for true não fazemos nada.
        if( ! Actions[ action ] ) return;

        /**
         * Criando um Ator.
         */
        if( action == 'actor' ) {
            let name = prompt('Digite o nome do ator:');
            if( ! name ) return;

            Actors.push( new Actor( sys.getID(), mouseX, mouseY, name ) );
            return;
        }

        /**
         * Criando um Use Case.
         */
        if( action == 'usecase' ) {
            if( ! dragging ) {           
                let name = prompt('Digite o nome do caso de uso:');
                if( ! name ) return;
                UseCases.push( new UseCase( sys.getID(), mouseX, mouseY, name ) );
            } else {
                dragging = false;
            }

            return;
        }

        /**
         * Criando uma anotação.
         */
        if( action == 'annotation') {
            let text = prompt('Digite a anotação:');
            if( ! text ) return;
            Annotations.push( new Annotation( sys.getID(), mouseX, mouseY, text ) );
            return;
        }

        /**
         * Criando um Include.
         */
        if( action == 'include') {

            let id = null;

            UseCases.forEach( function( obj ) {
                if( obj.hover )
                    id = obj.id;
            });

            if( id == null ) {
                alert('Você precisa selecionar um Use Case.');
                return;
            }

            if( temp.length == 0 ) {                              
                temp.push( id );
            } else {
                Includes.push(
                    new Include(
                        sys.getID(),
                        temp[0],
                        id
                    )
                );

                temp = [];
            }

            return;
        }

        /**
         * Criando um Extend.
         */
        if( action == 'extend' ) {
            
            let id = null;
            
            UseCases.forEach( function( obj ) {
                if( obj.hover )
                    id = obj.id;
            });

            if( id == null ) {
                alert('Você precisa selecionar um Use Case.');
                return;
            }

            if( temp.length == 0 ) {                              
                temp.push( id );
            } else {
                Extends.push(
                    new Extend(
                        sys.getID(),
                        temp[0],
                        id
                    )
                );

                temp = [];
            }

            return;
        }

        if( action == 'association' ) {

            if( temp.length == 0 ) {

                let idAtor = null;
                
                Actors.forEach( function( obj ) {
                    if( obj.hover )
                        idAtor = obj.id;
                });
    
                if( idAtor == null ) {
                    alert('Você precisa selecionar um ator.');
                    return;
                }

                temp.push( idAtor );
            } else {
            
                let idCase = null;

                UseCases.forEach( function( obj ) {
                    if( obj.hover )
                        idCase = obj.id;
                });

                if( idCase == null ) {
                    alert('Você precisa selecionar um Use Case.');
                    return;
                }

                Associations.push(
                    new Association(
                        sys.getID(),
                        temp[0],
                        idCase
                    )
                );

                temp = [];
            }

            return;
        }

    });

    return;
}

function doubleClicked() {

    Actors.forEach( ( elem ) => {
        if( elem.hover )
            elem.setName( prompt('Digite o nome do ator:', elem.name ) );
    });

    UseCases.forEach( ( elem ) => {
        if( elem.hover )
            elem.setName( prompt('Digite o nome do caso de uso:', elem.name ) );
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


/**
 * Método para alterar a ação do programa.
 */
function changeAction( action ) {
    Object.keys( Actions ).forEach( function( key ) {
        Actions[ key ] = ( key == action ) ? true : false;
        document.getElementById( key ).classList.remove('selected');        
        if( key == action ) document.getElementById( action ).className += ' selected';
    });
}

function generateURL() {

    let url = window.location.href;
    let id = url.substring( url.lastIndexOf('/') + 1 );

    $.post( window.location.href, {
        id: id,
        json: generateJSON()
    }, function( data, status ) {      
        window.location.href = '/correcao/' + data.id;
    });
}

function isOnArea() {

    var b = canvas.getBoundingClientRect();

    if(
        mouseX > b.left &&
        mouseX < b.right &&
        mouseY > b.top &&
        mouseY < b.bottom
    ) {
        return true;
    }

    return false;
}


function generateJSON() {

    let json = new Object();

    json.altura     = parseInt( canvas.getAttribute('width') );
    json.largura    = parseInt( canvas.getAttribute('height') );

    // Criamos os Use Cases.
    if( UseCases.length > 0 ) {
        json.cases = new Array();       

        UseCases.forEach( function( obj ) {
            Case = new Object();
            
            Case.id = obj.id;
            Case.nome = obj.name;
            Case.x = parseInt( obj.x );
            Case.y = parseInt( obj.y );            
            json.cases.push( Case );
        });
    }

    if( Actors.length > 0 ) {
        
        json.atores = new Array();       

        Actors.forEach( function( obj ) {
            Actor = new Object();
            
            Actor.id = obj.id;
            Actor.nome = obj.name;
            Actor.x = parseInt( obj.x );
            Actor.y = parseInt( obj.y );
            
            json.atores.push( Actor );
        });
    }

    if( Associations.length > 0 || Includes.length > 0 || Extends.length > 0 ) {

        if( Associations.length > 0 ) {
            json.associacoes = new Array();

            Associations.forEach( function( obj ) {
                Associacao = new Object();
                Associacao.id = sys.getID();
                Associacao.de = obj.from;
                Associacao.para = obj.to;

                json.associacoes.push( Associacao );
            });
        }
        
        if( Includes.length > 0 ) {
            json.includes = new Array();

            Includes.forEach( function( obj ) {
                Include = new Object();
                Include.id = sys.getID();
                Include.de = obj.from;
                Include.para = obj.to;

                json.includes.push( Include );
            });
        }

        if( Extends.length > 0 ) {
            json.extends = new Array();

            Extends.forEach( function( obj ) {
                Extend = new Object();
                Extend.id = sys.getID();
                Extend.de = obj.from;
                Extend.para = obj.to;

                json.extends.push( Extend );
            });
        }
    }

    if( Annotations.length > 0 ) {
        
        json.observacoes = new Array();       

        Annotations.forEach( function( obj ) {
            Annotation = new Object();
            
            Annotation.id = obj.id;
            Annotation.descricao = obj.text;
            Annotation.x = parseInt( obj.x );
            Annotation.y = parseInt( obj.y );
            
            json.observacoes.push( Annotation );
        });
    }

    let jsonString = JSON.stringify( json );

    return jsonString;
}

function inserirDiagrama() {

    let data = {
        author: $('input[name="author"]').val(),
        type: $('input[name="type"]').val(),
        title: $('input[name="title"]').val(),
        description: $('textarea[name="description"]').val(),
        json: generateJSON()
    };

    $.post( window.location.href, data, function( result, status ) {
        if( result.status )
            window.location.href = '/seus-exercicios';
    });
}