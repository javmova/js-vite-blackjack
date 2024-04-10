import _ from 'underscore';


// import {crearBaraja as crearNuevaBaraja} from './usecases/crear-deck';
// import crearBaraja, {individual} from './usecases/crear-deck'; //exportacion por defecot mas exportacion individual para probar
// console.log(individual);

import {crearBaraja, sacarCartaPop, valorCarta, turnoComputadora, crearCartaHTML} from './usecases/index';


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




     

     baraja= crearBaraja(palos, especiales); //No debería estar suelta aquí sin mas para llamar a la función y que se ejecute, tiene un mayor sentido lógico colocar esta instrucción dentro de una función, y esa función colocarla al inicio del código ya que sireve para inicalizar el juego
    
    
      //Función para sacar una carta a mi forma

    //   const longitudBaraja=baraja.length;
      // const numeroAleatorio=Math.round(Math.random()*longitudBaraja);
      // const sacarCarta=()=>{
          
      //     const carta=baraja.splice(numeroAleatorio, 1)
      //     // console.log(`la carta da ${carta}`);
      //     return carta;
      // }
          

      // console.log(`la carta es con mi método es ${sacarCarta()}.png`);




   









      //Crear cartas en html e ir sumando su valor
      const pedirCarta=()=>{
          
          //Contamos y sumamos los valores de las cartas que estamos obteniendo
          const cartaJugador=sacarCartaPop(baraja);

           //En lugar de calcular los puntos aqui y los puntos de la computadora en la funcion turnoComputadora() creamos en el codigo refactorizado una funcion para calcular los puntos y segun el turno colocarlos en un array en la posicion para jugador 1,2 o computador
          puntosJugador = puntosJugador + valorCarta(cartaJugador);
          marcadorPuntos[0].innerText=puntosJugador;

          //Dibujamos la carta en html
          // /En lugar de tener por separado la creacion de imagenes cartas en jugador/es y computadora lo creamos todo en una función en el código refactorizado
          const cartaImg=crearCartaHTML(cartaJugador);
          contenedorImgJugador.appendChild(cartaImg);

          //Comprobar si nos hemos pasado de 21
          if(puntosJugador>21){
              btnPedir.disabled=true;
              btnDetener.disabled=true;
              turnoComputadora(puntosJugador, marcadorPuntos, contenedorImgComputadora, baraja);
          }else if(puntosJugador===21){
              btnPedir.disabled=true;
              btnDetener.disabled=true;
              turnoComputadora(puntosJugador, marcadorPuntos, contenedorImgComputadora, baraja);
          }
          
      }






      const detenerJugada=()=>{
          btnPedir.disabled=true;
          btnDetener.disabled=true;
          
          turnoComputadora(puntosJugador, marcadorPuntos, contenedorImgComputadora, baraja);
      
      }

      const reiniciar=()=>{
          // baraja=[]; //En el código limpio refactrorizado se coloca en la función de crearBaraja, parece más óptimno que ponerlo en esta función que luego se usará como evento al dar click en el boton Nuevo Juego
          crearBaraja(palos, especiales);

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


