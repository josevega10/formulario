import validarCantidad from "./validaciones/validarCantidad";
import validarCorreo from "./validaciones/validarCorreo";
import validarNombre from "./validaciones/validarNombre";

const linea = document.getElementById('linea-pasos');
linea.addEventListener('click', (e) => {
    //Validamos que el click se en un paso
    if(!e.target.closest('.linea-pasos__paso')) return false;
   
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;
    //Vakidamos el paso actual.   
    if(pasoActual === 'cantidad') {
        if(!validarCantidad()) return;
    } else if (pasoActual === 'datos') {
        if(!validarNombre() || !validarCorreo()) return;
    }

    //Obtenemos el paso a navegar
    const pasoANavegar = e.target.closest('.linea-pasos__paso');
    
    //Comprobamos el si el paso tiene el icono de la palomita
    //Solo queremos poder dar click a los que tienen la palomita

    if(pasoANavegar.querySelector('.linea-pasos__paso-check--checked')){
        const pasoActual = linea.querySelector('.linea-pasos__paso-check--active');
        pasoActual.classList.remove('linea-pasos__paso-check--active');
        
        //Obtenemos el identificador del paso a navegar
        const id = pasoANavegar.dataset.paso;

        //Agregamos la clase active al nuevo paso
        linea.querySelector(`[data-paso="${id}"] span `).classList.add('linea-pasos__paso-check--active');
        

        //Navegamos al paso

        document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
            inline: 'start',
            behavior: 'smooth',
        });

        //Ocultar el icono de banco
        const btnFormulario = document.querySelector('#formulario__btn');
        btnFormulario.querySelector('span').innerText = 'Siguiente';
        btnFormulario.querySelector('[data-icono="banco"]').classList.remove('formulario__btn-contenedor-icono--active');
       
        //Mostrar icono de siguiente
        btnFormulario.querySelector('[data-icono="siguiente"]').classList.add('formulario__btn-contenedor-icono--active');
    }
    
});