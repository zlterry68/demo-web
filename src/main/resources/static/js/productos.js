
document.addEventListener("DOMContentLoaded",e=>{
    controlSesion()
    cargarProductos()
    actualizarEmailDelUsuario()
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

function cerrarSesion(){
    const $cerrar=document.getElementById('sign-off')
    document.addEventListener("click",async e=>{
        if(e.target===$cerrar){
            localStorage.removeItem('token')
            localStorage.removeItem('email')

        }
    })

}
async function cargarProductos(){
    const request = await fetch('api/productos', {
        method: 'GET',
        headers: getHeaders()

    });
    const productos = await request.json();

    $(document).ready( function () {
        let listadoHTML = '';

        for (let producto of productos) {
            let botonEliminar = '<a href="#" onclick="eliminarProducto(' + producto.id + ')"  class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a>';
            let botonEditar = `<a  href="#" data-toggle="modal" onclick="actualizarProducto(${producto.id},'${producto.nombre}',${producto.precio},${producto.stock},'${producto.estado}')" data-target="#logoutModalProduct" class="btn btn-success btn-circle"><i class="fa fa-file" aria-hidden="true"></i></a>`;

            let productoHTML = '<tr><td>' + producto.id + '</td><td>' + producto.nombre + '</td><td>' + producto.precio + ' $</td><td>' + producto.stock + '</td><td>' + producto.estado + '</td><td>' + botonEliminar+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+botonEditar+ '</td></tr>';
            listadoHTML += productoHTML;
        }


        document.querySelector('.tbody').innerHTML = listadoHTML;
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

async function eliminarProducto(id) {
    if (!confirm("¿Desea eliminar este producto?")) {
        return;
    }
    const request = await fetch('api/productos/' + id, {
        method: 'DELETE',
        headers: getHeaders()

    });
    location.reload()

}


function actualizarProducto(id,nombre,precio,stock,estado) {
    const $name=document.getElementById("txtNombre"),
        $price=document.getElementById("txtPrecio"),
        $state=document.getElementById("txtEstado"),
        $st=document.getElementById("txtStock"),
        $form=document.getElementById("form-update-product")

        $name.textContent=nombre
        $price.textContent=precio
        $state.textContent=estado
        $st.textContent=stock


        document.addEventListener("submit",e=>{
            if(e.target===$form){
                e.preventDefault()
                let datos = {};
                datos.nombre = e.target.txtNombre.value;
                datos.precio = parseFloat(e.target.txtPrecio.value);
                datos.stock = parseInt(e.target.txtStock.value);
                datos.estado = e.target.txtEstado.value;

                fetchEditarProducto(id,datos)

                alert("Producto actualizado con éxito")

                location.reload()
            }
        })




}
async function fetchEditarProducto(id,datos) {


    const request = await fetch('api/producto_update/' + id, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(datos)
    });
}