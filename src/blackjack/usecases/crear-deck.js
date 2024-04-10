import _ from 'underscore'
 
// export const individual="exportacion individual"; //Para exportacion individual


/**
 * Esta función crea un nuevo deck
 * @param {Array<String>} tiposDePalos Entre llaves aparecia por defecto * que quiere decir any y nosotros lo hemos cambiado por array
 * @param {Array<String>} tiposEspeciales Ejemplo: ["A", "J","K","K"]
 * @returns {Array<String>} retorna un nuevo decj de cartas
 */

/** */

// const crearBaraja=(tiposDePalos, tiposEspeciales )=>{ //como se pondria para exportacion por defecto
export const crearBaraja=(tiposDePalos, tiposEspeciales )=>{

    if (!tiposDePalos || tiposDePalos.length===0){
        throw new Error ('tiposDePalos es obligatorio como un array de string');
    }
    if (!tiposEspeciales || tiposEspeciales.length===0){
        throw new Error ('tiposEspeciales es obligatorio como un array de string');
    }
   

    let baraja= [];

    for (let i=2; i<=10;i++){
        for (let palo of tiposDePalos){
        baraja.push(i+palo);
        }
    }


    for (let especial of tiposEspeciales){
        for  (let palo of tiposDePalos){
            baraja.push(especial+palo);
        }
    }
   
    return baraja=_.shuffle(baraja);
    // return baraja //Fernando lo tiene igual pero con este return baraja
    
   
}

// export default crearBaraja;// como se podnria para exportación por defecto