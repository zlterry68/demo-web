document.addEventListener("DOMContentLoaded",e=>{
    controlSesion()
    cargarUsuarios()
    //$('#usuarios').DataTable();
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


async function cargarUsuarios() {

    const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeaders()

    });
    const usuarios = await request.json();
    $(document).ready( function () {
    let listadoHTML = '';
    for (let usuario of usuarios) {
        let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a>';
        let usuarioHTML = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + ' ' + usuario.apellido + '</td><td>' + usuario.email  + '</td><td>' + botonEliminar + '</td></tr>';
        listadoHTML += usuarioHTML;
    }


    document.querySelector('.tbody').outerHTML = listadoHTML;
    $('.table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
} );
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    }
}

async function eliminarUsuario(id) {
    if (!confirm("¿Desea eliminar este usuario?")) {
        return;
    }
    const request = await fetch('api/usuarios/' + id, {
        method: 'DELETE',
        headers: getHeaders()

    });
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