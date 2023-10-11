'use strict';

const formulario$3 = document.getElementById('formulario');

const validarCantidad = () => {
    const ExprRegCantidad = /^\d+(\.\d+)?$/; 

    const inputCantidad = formulario$3.cantidad;
    
    if(ExprRegCantidad.test(inputCantidad.value)){
        inputCantidad.classList.remove('formulario__input--error');
        return true;
    } else {
        inputCantidad.classList.add('formulario__input--error');
        return false;
    }

  
};

const formulario$2 = document.getElementById('formulario');

const validarNombre = () => {
    const ExprRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; 

    const inputNombre = formulario$2['nombre-receptor'];
    
    if(ExprRegNombre.test(inputNombre.value)){
        inputNombre.classList.remove('formulario__input--error');
        return true;
    } else {
        inputNombre.classList.add('formulario__input--error');
        return false;
    }
 
};

const formulario$1 = document.getElementById('formulario');

const validarCorreo = () => {
    const ExprRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; 

    const inputCorreo = formulario$1['correo-receptor'];
    
    if(ExprRegCorreo.test(inputCorreo.value)){
        inputCorreo.classList.remove('formulario__input--error');
        return true;
    } else {
        inputCorreo.classList.add('formulario__input--error');
        return false;
    }
 
};

const marcarPaso = (paso) => {
    document
    .querySelector(`.linea-pasos [data-paso="${paso}"] span `)
    .classList.add('linea-pasos__paso-check--checked');
};

const siguientePaso = () => {
 // Crear un arreglo 
 const pasos = [...document.querySelectorAll('.linea-pasos__paso')];

 //Obtener el paso activo
const pasoActivo = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');

//Obtenemos el index del paso activo
const indexPasoActivo = pasos.indexOf(pasoActivo);

if(indexPasoActivo < pasos.length -1) {
    //Elimar clase activa
    pasoActivo.querySelector('span').classList.remove('linea-pasos__paso-check--active');

    //Pasomos la clase activa al siguiente elemento
    pasos[indexPasoActivo + 1].querySelector('span').classList.add('linea-pasos__paso-check--active');
}
 
    const id = pasos[indexPasoActivo + 1].dataset.paso;
   document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
    inline:'start',
    behavior: 'smooth'
   });

};

const formulario = document.getElementById('formulario');

//Reiciando scroll al cargar el formulario
formulario.querySelector('.formulario__body').scrollLeft = 0;

formulario.addEventListener('keyup', (e) => {
    if(e.target.tagName === 'INPUT'){
        if(e.target.id === 'cantidad'){
            validarCantidad();
        } else if (e.target.id === 'nombre-receptor'){
            validarNombre();
        } else if(e.target.id === 'correo-receptor') {
            validarCorreo();
        }
    }
});

const btnFormulario = document.getElementById("formulario__btn");
btnFormulario.addEventListener('click', (e) => {
    e.preventDefault();

    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest(".linea-pasos__paso").dataset.paso;
    if(pasoActual === 'cantidad'){
       if(validarCantidad()){
        marcarPaso('cantidad');
        siguientePaso();
     } 
    } else if (pasoActual === 'datos') {
        if(validarNombre() && validarCorreo()){
            marcarPaso('datos');
            siguientePaso();
         } 
    } else if (pasoActual === 'metodo') {
        marcarPaso('metodo');


        //Formato de moneda
        const opciones = {style: 'currency', currency: 'COP'};
        const formatoMoneda = new Intl.NumberFormat('es-CO', opciones);

        //Recepcion del valor
       document.querySelector('[data-valor="cantidad"] span').innerText = formatoMoneda.format(formulario.cantidad.value);
       //Recepcion del nombre
       document.querySelector('[data-valor="nombre-receptor"] span').innerText = formulario['nombre-receptor'].value;
        //Recepcion del correo
        document.querySelector('[data-valor="correo-receptor"] span').innerText = formulario['correo-receptor'].value;
        //Recepcion Metodo
        document.querySelector('[data-valor="metodo"] span').innerText = formulario.metodo.value;
        
        //Cambiar el texto a tranferiri
        btnFormulario.querySelector('span').innerHTML = 'Transferir';

        //Clase que deshalita el boton
        btnFormulario.classList.add('formulario__btn--disabled');

        //Ocultar boton de siguiente
        btnFormulario.querySelector('[data-icono= "siguiente"]').classList.remove('formulario__btn-contenedor-icono--active');

        //Mostrar el Icono del banco
        btnFormulario.querySelector('[data-icono= "banco"]').classList.add('formulario__btn-contenedor-icono--active');
        
        siguientePaso();

        //Eliminar la clase disabled despues 4 segundos

        setTimeout(() => {
            btnFormulario.classList.remove('formulario__btn--disabled');
        }, 4000);
    } else if (pasoActual === 'confirmacion' && !btnFormulario.matches('.formulario__btn--disabled') ) {
        //Aqui se haria la petición al servidor, una redirección, etc.
        
        //Cambio del boton a transfiriendo
        btnFormulario.querySelector('span').innerText = 'Tranfiriendo...';

        btnFormulario.classList.add('formulario__btn--disabled');

        setTimeout(() => {
            formulario.classList.add('formulario--hidden');
            document.getElementById('alerta').classList.add('alerta--active');
        }, 4000);
    }
});

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
//# sourceMappingURL=bundle.js.map
