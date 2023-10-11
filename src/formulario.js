import validarCantidad from "./validaciones/validarCantidad";
import validarNombre from "./validaciones/validarNombre";
import validarCorreo from "./validaciones/validarCorreo";
import marcarPaso from "./marcarPaso";
import siguientePaso from "./siguientePaso";

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
        }, 4000)
    }
});
