document.addEventListener("DOMContentLoaded",e=>{
    controlSesion()
    actualizarEmailDelUsuario();
    cerrarSesion()
});
function controlSesion(){
    if(Object.keys(localStorage).length === 0){
        location.href='index.html'
    }
}


function actualizarEmailDelUsuario() {
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}

async function registrarProductos() {
    let datos = {};
    datos.nombre = document.getElementById('txtNombre').value;
    datos.precio = parseFloat(document.getElementById('txtPrecio').value);
    datos.stock = parseInt(document.getElementById('txtStock').value);
    datos.estado = document.getElementById('txtEstado').value;

    if(datos.estado==="Estado...."){
        datos.estado=null
    }
    //console.log(datos)

    const request = await fetch('api/productos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });


    alert("Producto agregado con éxito");
    location.reload()

}


function cerrarSesion(){
    const $cerrar=document.getElementById('sign-off')
    document.addEventListener("click",async e=>{
        if(e.target===$cerrar){
            localStorage.removeItem('token')
            localStorage.removeItem('email')

        }
    })

}