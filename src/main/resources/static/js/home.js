

document.addEventListener("DOMContentLoaded",e=>{
    controlSesion()
    actualizarEmailDelUsuario()
    cerrarSesion()

})



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