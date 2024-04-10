let arr=[];
let contenedorJugador=document.querySelector("span");
let btn=document.querySelector("#btn-pedir");

const numeros=[0,1,2,3,4,5,6,7,8,9];
const turnos=[9,8,7,6,5,4,3,2,1,0];



console.log(arr);

const puntos=()=>{
   const numero=numeros.pop();
//    const turno=turnos.pop();
 arr.push();
  
    console.log({arr});
    console.log({numero});
    // console.log({turno});
    arr[0]= arr[0]+numero;
    console.log(arr[0]);

}

btn.addEventListener("click", puntos);