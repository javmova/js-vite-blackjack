const miModulo = (() => {

    'use strict';

    
        let baraja=[];
        const palos=["C","D","H","S"],
              especiales=["A", "J","K","K"];

       
        let puntosJugadores=[0,0]; //En lugar de realizar puntos jugador y puntos computadora, hacemos un array en el que podemos asi ser mas flexible con el numero de jugadores, por ejemplo
        //  si tenemos un jugador, pondriamos en la posicion 0 cero en numero para indicar los puntos por defecto del jugador y en la posicion 1 otro 0 en numero para los puntos de la computadora
        /*
            1 Jugador (y computadora)
            let puntosJugadores=[0,0];
            
            2 Jugadores (y computadora)
            let puntosJugadores=[0,0,0];
        */

        const marcadorPuntos=document.querySelectorAll("span"),// Ahora en lugar de estar por separado el contenedor de jugador/es o contenedor de computadora en la version refactorizada lo haremos por un array usando la clase 
              divCartasJugadores=document.querySelectorAll(".divCartas");
            
            


        //Botones para jugar
        const btnPedir =document.getElementById("btn-pedir"),
              btnDetener =document.getElementById("btn-detener"),
              btnNuevo =document.getElementById("btn-nuevo");

        // Está función inicializa el juego
        const inicializarJuego=( numJugadores =2 )=>{ //Aqui igualamos una variable a 1 que simbolizara el numero de jugadores, por defecto es 1
        //    baraja= []; 
            crearBaraja();
            puntosJugadores=[];

            //Usamos diferentes ciclos para recorrer array de puntos, contenedores y reiniciar, en el codigo no refactorizado no se usan ciclos
            for(let i=0;i<numJugadores;i++){
                puntosJugadores.push(0);
                // marcadorPuntos[i].innerText=0;//Lo hice por mi cuenta pero lo deje como esta con Fernando usando el forEach
            }
            
            marcadorPuntos.forEach(elemento=>elemento.innerText=0);
           divCartasJugadores.forEach(elemento=>elemento.innerText="");

         
           
           btnPedir.disabled=false;
           btnDetener.disabled=false; 
           //Hasta aqui

            

        }

        //Funcion que crea una baraja
        const crearBaraja=()=>{
            baraja=[]; //Aqui colocamos la reinicialización de la baraja, en el código mas sucio esta dentro de la función reiniciar, que luego se usa para el evento al dar clic en el boton Nuevo Juego, pero es mejor ponerlo aqui

            for (let i=2; i<=10;i++){
                for (let palo of palos){
                baraja.push(i+palo);
                }
            }


            for (let especial of especiales){
                for  (let palo of palos){
                    baraja.push(especial+palo);
                }
            }
           
            baraja= _.shuffle(baraja); 
            // return baraja //Fernando lo tiene igual pero con este return baraja
                
           
        }

        
        crearBaraja();

        //Función para sacar una carta a mi forma
        // const numeroAleatorio=Math.round(Math.random()*longitudBaraja);
        // const sacarCarta=()=>{
            
        //     const carta=baraja.splice(numeroAleatorio, 1)
        //     // console.log(`la carta da ${carta}`);
        //     return carta;
        // }
            

  


        // Funcion para sacar una carta con metodo pop
        const sacarCartaPop = () =>{

            if(baraja.length===0){
                throw "ya no quedan cartas";
                
            }else{
            
            return baraja.pop(); //Antes se igualaba baraja a baraja.pop y luego el return, aqui lo hacemos todo en una línea
            }
        }

        // funcion para conseguir el valor de la carta
        const valorCarta=(cartaPop)=>{

            const valor = cartaPop.substring(0, cartaPop.length -1);
            return (isNaN(valor)) ? 
                                (valor=="A") ?  11 :  10
                                :valor*1;
            
        }




        //Funcion para calcular puntos de las cartas, en el código "mas sucio" no aparece y se acumula los puntos de la computador en la funcion turnoComputadora() y los del jugador en pedircarta(), en este caso se acumulan los puntos en el arreglo segun el turno
        //Turno 0: primer jugador, Turno 1: Segundo jugador (o computadora), Ultimo turno siempre sera la computadora
        const acumularPuntos=(carta, turno )=>{
       
            puntosJugadores[turno] = puntosJugadores[turno]+ valorCarta(carta);
            marcadorPuntos[turno].innerText=puntosJugadores[turno];
           
            return puntosJugadores[turno];
        }

        


        const crearCarta=(carta, turno)=>{ //En lugar de tener por separado la creacion de imagenes cartas en jugador/es y computadora lo creamos todo en una función 

            const cartaImg=document.createElement("img")
            cartaImg.classList.add("carta");
            cartaImg.src=`assets/cartas/${carta}.png`;
            divCartasJugadores[turno].appendChild(cartaImg);

        }




        //Crear cartas en html e ir sumando su valor
        const pedirCarta=()=>{
            
            //Contamos y sumamos los valores de las cartas que estamos obteniendo
            
            const carta=sacarCartaPop();
            
            const puntosJugador= acumularPuntos(carta,0);//aqui llamamos a la funcion acumular puntos en lugar de tener el codigo como estaba antes dentro en lugar de metido en una función

            //Dibujamos la carta en html
            crearCarta(carta,0);//Llamamos a la función para dibujar la carta, en lugar de como antes qaue estaba aqui dentro son mas ahora se encuentra en una funcion y dependiendo del tunro se dibujara en jugador/es o en computadora por medio de un array

         
            //Comprobar si nos hemos pasado de 21 o igualado a 21
            if(puntosJugador>21){
                btnPedir.disabled=true;
                btnDetener.disabled=true;
                turnoComputadora(puntosJugador);
            }else if(puntosJugador===21){
                btnPedir.disabled=true;
                btnDetener.disabled=true;
                turnoComputadora(puntosJugador);
            }
            
        }


        const determinarGanador=()=>{ //en lugar de tener esas instrucciones dentro de la función turnoComputadora, mejor lo realizamos en una función a parte
            
            const [puntosJugador, puntosComputadora]= puntosJugadores;// A esto se le llama desestructuracion, obtenemos la posicion 0 y 1 de puntosJuadores y las asjudicamos a los constantes puntosJugador y puntosComputadora

            setTimeout(() => {//En el código refactorizado esto lo hacemos en una funciñon aparte llamada determinarGanador
                (puntosJugador>21 || (puntosComputadora<=21 && puntosComputadora>puntosJugador))? alert("Perdiste"): (puntosComputadora>21 || (puntosJugador<=21 && puntosJugador>puntosComputadora)) ? alert("Enhorabuena, ganaste"): alert("Empate");
                
            }, 550);

            //Aqui es como tenia yo el codigo hecho por mi cuenta en lugar de haber usado la desestructuracion, cambie sus las variables.
            // setTimeout(() => {
            //     (puntosJugadores[0]>21 || (puntosJugadores[puntosJugadores.length-1]<=21 && puntosJugadores[puntosJugadores.length-1]>puntosJugadores[0]))? alert("Perdiste"): (puntosJugadores[puntosJugadores.length-1]>21 || (puntosJugadores[0]<=21 && puntosJugadores[0]>puntosJugadores[puntosJugadores.length-1])) ? alert("Enhorabuena, ganaste"): alert("Empate");
                
            // }, 550);
        }

    
        //turno computadora
        const turnoComputadora=(puntosCompetencia)=>{
            let puntosComputadora=0;

            do{
            const carta=sacarCartaPop();
            puntosComputadora= acumularPuntos(carta, puntosJugadores.length-1); //aqui llamamos a la funcion acumular puntos en lugar de tener el codigo como estaba antes dentro en lugar de metido en una función
            crearCarta(carta,puntosJugadores.length-1);//Llamamos a la función para dibujar la carta, en lugar de como antes qaue estaba aqui dentro son mas ahora se encuentra en una funcion y dependiendo del tunro se dibujara en jugador/es o en computadora por medio de un array
            
            }while(puntosComputadora <= puntosCompetencia && puntosCompetencia <=21);

            determinarGanador();//En lugar de que aqui tenemos un setTimeouy y viendo diferecntes opciones para ver quien ganaba, la pusimos en una funcion a parte y aqui la llamamos
        }




        const detenerJugada=()=>{
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            
            turnoComputadora(puntosJugadores[0]);
        
        }

        const reiniciar=()=>{
            
            inicializarJuego();
            // crearBaraja();
            // puntosJugadores[0]=0;
            // puntosJugadores[puntosJugadores.length-1]=0;
            // marcadorPuntos[0].innerText="0";
            // marcadorPuntos[1].innerText="0";
            // contenedorImgJugador.innerHTML=null;//Asi lo puse yo por probar
            // contenedorImgComputadora.innerHTML=""; //Asi lo puso Fernando
            // btnPedir.disabled=false;
            // btnDetener.disabled=false;
        }

        btnPedir.addEventListener("click", pedirCarta);
        btnDetener.addEventListener("click",detenerJugada);
        btnNuevo.addEventListener("click",reiniciar);
        // btnDetener.addEventListener("click",comprobacionGanador);



        return {
            nuevoJuego: inicializarJuego
        };



})();


