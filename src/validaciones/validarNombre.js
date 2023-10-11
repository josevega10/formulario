const formulario = document.getElementById('formulario');

const validarNombre = () => {
    const ExprRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; 

    const inputNombre = formulario['nombre-receptor'];
    
    if(ExprRegNombre.test(inputNombre.value)){
        inputNombre.classList.remove('formulario__input--error');
        return true;
    } else {
        inputNombre.classList.add('formulario__input--error');
        return false;
    }
 
};

export default validarNombre;