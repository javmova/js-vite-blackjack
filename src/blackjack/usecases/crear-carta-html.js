
/**
 * 
 * @param {string} cartaComputadora la ruta de la imagen de la carta
 * @return {HTMLImageElement} imagen de retorno
 */

export const crearCartaHTML=(cartaComputadora)=>{
    if(!cartaComputadora) throw new Error('La cartaComputadora es un argumento obligatorio');

    const cartaImg=document.createElement("img");
        cartaImg.classList.add("carta");
        cartaImg.src=`assets/cartas/${cartaComputadora}.png`;

        return cartaImg;

}