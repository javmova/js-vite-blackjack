(()=>{

    'use strict'

    
        let baraja=[];
        const palos=["C","D","H","S"];
        const especiales=["A", "J","K","K"];

        let puntosJugador=0,
            puntosComputadora=0;//En el coódigo optimizado en lugar de esto creamos un array vacio para ser mas flexibles con el numero de jugadores,  mas tarde en una función que sirve para inicializar la baraja tendra un parametro para indicar el número de jugadores y segun eso añadimos una posicion a 0 para indicar lospuntos por defeco de cada jugador

        const marcadorPuntos=document.querySelectorAll("span");
        // En el refactorizado en lugar de usar contenedor por id uno para jugador y otro para computadora, se obtienen por una clase y haciendo un array con ambos
        const contenedorImgJugador =document.querySelector("#jugador-cartas");
        const contenedorImgComputadora =document.querySelector("#computadora-cartas");

        //Botones para jugar
        const btnPedir =document.getElementById("btn-pedir");
        const btnDetener =document.getElementById("btn-detener");
        const btnNuevo =document.getElementById("btn-nuevo");




        //Funcion que crea una baraja
        const crearBaraja=()=>{
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
           
            baraja=_.shuffle(baraja);
            // return baraja //Fernando lo tiene igual pero con este return baraja
            
           
        }

        crearBaraja(); //No debería estar suelta aquí sin mas para llamar a la función y que se ejecute, tiene un mayor sentido lógico colocar esta instrucción dentro de una función, y esa función colocarla al inicio del código ya que sireve para inicalizar el juego


        //Función para sacar una carta a mi forma

        const longitudBaraja=baraja.length;
        // const numeroAleatorio=Math.round(Math.random()*longitudBaraja);
        // const sacarCarta=()=>{
            
        //     const carta=baraja.splice(numeroAleatorio, 1)
        //     // console.log(`la carta da ${carta}`);
        //     return carta;
        // }
            

        // console.log(`la carta es con mi método es ${sacarCarta()}.png`);


        // Funcion para sacar una carta con metodo pop
        const sacarCartaPop = () =>{

            if(baraja.length===0){
                throw "ya no quedan cartas";
                
            }else{
            const cartaPop= baraja.pop();
            return cartaPop; //Es mejor juntarlo todo en una linea hacer simplemente return baraja.pop();
            }
        }

        // funcion para conseguir el valor de la carta

        const valorCarta=(cartaPop)=>{

            const valor = cartaPop.substring(0, cartaPop.length -1);
            return (isNaN(valor)) ? 
                                (valor=="A") ?  11 :  10
                                :valor*1;
            
        }









        //Crear cartas en html e ir sumando su valor
        const pedirCarta=()=>{
            
            //Contamos y sumamos los valores de las cartas que estamos obteniendo
            const cartaJugador=sacarCartaPop();

             //En lugar de calcular los puntos aqui y los puntos de la computadora en la funcion turnoComputadora() creamos en el codigo refactorizado una funcion para calcular los puntos y segun el turno colocarlos en un array en la posicion para jugador 1,2 o computador
            puntosJugador = puntosJugador + valorCarta(cartaJugador);
            marcadorPuntos[0].innerText=puntosJugador;

            //Dibujamos la carta en html
            // /En lugar de tener por separado la creacion de imagenes cartas en jugador/es y computadora lo creamos todo en una función en el código refactorizado
            const cartaImg=document.createElement("img")
            cartaImg.classList.add("carta");
            cartaImg.src=`assets/cartas/${cartaJugador}.png`;
            contenedorImgJugador.appendChild(cartaImg);

            //Comprobar si nos hemos pasado de 21
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

        //turno computadora
        const turnoComputadora=(puntosCompetencia)=>{

            do{

            const cartaComputadora=sacarCartaPop();

            //En lugar de calcular los puntos aqui y los puntos de jugador en la funcion pedirCarta() creamos en el codigo refactorizado una funcion para calcular los puntos y segun el turno colocarlos en un array en la posicion para jugador 1,2 o computador
            puntosComputadora = puntosComputadora + valorCarta(cartaComputadora);
            marcadorPuntos[1].innerText=puntosComputadora;

            // /En lugar de tener por separado la creacion de imagenes cartas en jugador/es y computadora lo creamos todo en una función en el código refactorizado
            const cartaImg=document.createElement("img") 
            cartaImg.classList.add("carta");
            cartaImg.src=`assets/cartas/${cartaComputadora}.png`;
            contenedorImgComputadora.appendChild(cartaImg);


            if(puntosCompetencia>21){
                break;
            }

            }while(puntosComputadora <= puntosCompetencia && puntosCompetencia <=21);

            setTimeout(() => {//En el código refactorizado esto lo hacemos en una funciñon aparte llamada determinarGanador
                (puntosJugador>21 || (puntosComputadora<=21 && puntosComputadora>puntosJugador))? alert("Perdiste"): (puntosComputadora>21 || (puntosJugador<=21 && puntosJugador>puntosComputadora)) ? alert("Enhorabuena, ganaste"): alert("Empate");
                
            }, 550);

            
            
        }




        const detenerJugada=()=>{
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            
            turnoComputadora(puntosJugador);
        
        }

        const reiniciar=()=>{
            // baraja=[]; //En el código limpio refactrorizado se coloca en la función de crearBaraja, parece más óptimno que ponerlo en esta función que luego se usará como evento al dar click en el boton Nuevo Juego
            crearBaraja();

            //En el código refactorizado ponemos todo esto en una función a parte llamada incialiarJuego() y usamos ciclos reiniciar puntos, cartas, contenedores, ya que estan dentro de arrays
            puntosJugador=0; 
            puntosComputadora=0;
            marcadorPuntos[0].innerText="0";
            marcadorPuntos[1].innerText="0";
            contenedorImgJugador.innerHTML=null;//Asi lo puse yo por probar
            contenedorImgComputadora.innerHTML=""; //Asi lo puso Fernando
            btnPedir.disabled=false;
            btnDetener.disabled=false;
            
        
        }

        btnPedir.addEventListener("click", pedirCarta);
        btnDetener.addEventListener("click",detenerJugada);
        btnNuevo.addEventListener("click",reiniciar);
        // btnDetener.addEventListener("click",comprobacionGanador);







})();


