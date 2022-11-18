document.addEventListener("DOMContentLoaded",e=>{
    controlSesion()
    llenadoUsuario();
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
async function llenadoUsuario(){
    const datos = {};
    datos.email = localStorage.email;
    const request = await fetch('api/mostrarUsuario', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    body: JSON.stringify(datos)
    });
    const usuario = await request.json();
    $("#txtNombre").val(usuario.nombre);
    $("#txtApellido").val(usuario.apellido);
    $("#txtCorreo").val(usuario.email);
    $("#txtId").val(usuario.id);
    $("#txtContraseña").val(usuario.password);
}
async function modificarUsuario() {
    var contra = document.getElementById('txtContraseña').value;
    const dato={};
    dato.nombre = document.getElementById('txtContraseña').value;
    dato.password = document.getElementById('txtContra').value;
    const request = await fetch('api/usuarioContra', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
    body: JSON.stringify(dato)
    });
    var respuesta = await request.text();
    if(respuesta==="true"){

        var nuevaContra = document.getElementById('txtNewContraseña').value;
        var repetirNuevaContra = document.getElementById('txtNewContraseñaRep').value;
        if(nuevaContra==repetirNuevaContra){
            let datos = {};
            datos.id = document.getElementById('txtId').value;
            datos.nombre = document.getElementById('txtNombre').value;
            datos.apellido = document.getElementById('txtApellido').value;
            datos.email = document.getElementById('txtCorreo').value;
            datos.password = document.getElementById('txtNewContraseña').value;
            const request = await fetch('api/modoficarUsuario', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
                });
                alert("La cuenta fue modificada con exito");
                location.href = 'index.html'
       }
    }
    else{
        alert('Escriba correctamente su contraseña antigua');
    }
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