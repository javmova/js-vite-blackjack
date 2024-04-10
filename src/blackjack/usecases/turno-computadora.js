      import {sacarCartaPop, valorCarta, crearCartaHTML} from './';
    
      
      /**
       * 
       * @param {number} puntosCompetencia puntos mínimos que la ocmputadora necesita para ganar
       * @param {HTMLElement} marcadorPuntos elemento HTML para mostrar los puntos
       * @param {HTMLElement} contenedorImgComputadora elemento HTML para mostrar las cartas de la computadora
       * @param {Array<string>} baraja 
       */
      
      //turno computadora
      export const turnoComputadora=(puntosCompetencia, marcadorPuntos , contenedorImgComputadora, baraja=[])=>{


        if(!puntosCompetencia) throw new Error('Puntos de la competencia son necesarios');
        if(!marcadorPuntos) throw new Error('Argumento marcadorPuntos es necesario');
      
        let puntosComputadora=0;

        do{

        const cartaComputadora=sacarCartaPop(baraja);

        //En lugar de calcular los puntos aqui y los puntos de jugador en la funcion pedirCarta() creamos en el codigo refactorizado una funcion para calcular los puntos y segun el turno colocarlos en un array en la posicion para jugador 1,2 o computador
        puntosComputadora = puntosComputadora + valorCarta(cartaComputadora);
        marcadorPuntos[1].innerText=puntosComputadora;

        // /En lugar de tener por separado la creacion de imagenes cartas en jugador/es y computadora lo creamos todo en una función en el código refactorizado
        

        //TODO: crear carta
        let  cartaImg=crearCartaHTML(cartaComputadora)
        
        contenedorImgComputadora.appendChild(cartaImg);

       
        if(puntosCompetencia>21){
            break;
        }

        }while(puntosComputadora <= puntosCompetencia && puntosCompetencia <=21);

        setTimeout(() => {//En el código refactorizado esto lo hacemos en una funciñon aparte llamada determinarGanador
            (puntosCompetencia>21 || (puntosComputadora<=21 && puntosComputadora>puntosCompetencia))? alert("Perdiste"): (puntosComputadora>21 || (puntosCompetencia<=21 && puntosCompetencia>puntosComputadora)) ? alert("Enhorabuena, ganaste"): alert("Empate");
            
        }, 550);

        
        
    }