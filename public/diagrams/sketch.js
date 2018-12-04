
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

    $.ajax({
        url: '/diagramas/caso-de-uso/salvar',
        method: "POST",
        dataType: "JSON",
        data: {
            conteudo: generateJSON()
        },
        success: function( response ) {
            console.log( response );
        }
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

    json.tipo       = 'UseCase';
    json.problema   = 'Qual é o Use Case?';
    json.altura     = parseInt( canvas.getAttribute('width') );
    json.largura    = parseInt( canvas.getAttribute('height') );

    json.diagrama   = new Object();

    // Criamos os Use Cases.
    if( UseCases.length > 0 ) {

        json.diagrama.cases = new Array();       

        UseCases.forEach( function( obj ) {
            Case = new Object();
            
            Case.id = obj.id;
            Case.nome = obj.name;

            Case.atributos = new Object();
            Case.atributos.x = parseInt( obj.x );
            Case.atributos.y = parseInt( obj.y );
            
            json.diagrama.cases.push( Case );
        });
    }

    if( Actors.length > 0 ) {
        
        json.diagrama.atores = new Array();       

        Actors.forEach( function( obj ) {
            Actor = new Object();
            
            Actor.id = obj.id;
            Actor.nome = obj.name;

            Actor.atributos = new Object();
            Actor.atributos.x = parseInt( obj.x );
            Actor.atributos.y = parseInt( obj.y );
            
            json.diagrama.atores.push( Actor );
        });
    }

    if( Associations.length > 0 || Includes.length > 0 || Extends.length > 0 ) {

        json.diagrama.ligacoes = new Object();

        if( Associations.length > 0 ) {
            json.diagrama.ligacoes.associacao = new Array();

            Associations.forEach( function( obj ) {
                Associacao = new Object();
                Associacao.id = sys.getID();
                Associacao.de = obj.from;
                Associacao.para = obj.to;

                json.diagrama.ligacoes.associacao.push( Associacao );
            });
        }
        
        if( Includes.length > 0 ) {
            json.diagrama.ligacoes.include = new Array();

            Includes.forEach( function( obj ) {
                Include = new Object();
                Include.id = sys.getID();
                Include.de = obj.from;
                Include.para = obj.to;

                json.diagrama.ligacoes.include.push( Include );
            });
        }

        if( Extends.length > 0 ) {
            json.diagrama.ligacoes.extend = new Array();

            Extends.forEach( function( obj ) {
                Extend = new Object();
                Extend.id = sys.getID();
                Extend.de = obj.from;
                Extend.para = obj.to;

                json.diagrama.ligacoes.extend.push( Extend );
            });
        }
    }

    if( Annotations.length > 0 ) {
        
        json.diagrama.observacoes = new Array();       

        Annotations.forEach( function( obj ) {
            Annotation = new Object();
            
            Annotation.id = obj.id;
            Annotation.descricao = obj.text;

            Annotation.atributos = new Object();
            Annotation.atributos.x = parseInt( obj.x );
            Annotation.atributos.y = parseInt( obj.y );
            
            json.diagrama.observacoes.push( Annotation );
        });
    }



    let jsonString = JSON.stringify( json );

    return jsonString;
}