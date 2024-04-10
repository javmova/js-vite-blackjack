      
      /**
       * Funcion para sacar una carta con metodo pop
       * @param {Array<string>} baraja es un array de string
       * @returns {string} retorna la carta de la baraja
       */
      
      
    
      export const sacarCartaPop = (baraja) =>{
       
        if(!baraja || baraja.length===0){
            throw "ya no quedan cartas";
            
        }else{
            return baraja.pop();
        // return cartaPop; //Es mejor juntarlo todo en una linea hacer simplemente return baraja.pop();
        }
    }