

   /**
    * funcion para conseguir el valor de la carta
    * @param {string} cartaPop la carta que se saco
    * @returns {number} que es el valor de la carta
    */

   export const valorCarta=(cartaPop)=>{

    const valor = cartaPop.substring(0, cartaPop.length -1);
    return (isNaN(valor)) ? 
                        (valor=="A") ?  11 :  10
                        :valor*1;
    
}