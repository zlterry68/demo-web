document.addEventListener("DOMContentLoaded",e=>{
    controlSesion()
    actualizarEmailDelUsuario();
    cerrarSesion()
});

const d=document

function controlSesion(){
    if(Object.keys(localStorage).length === 0){
        location.href='index.html'
    }
}


function actualizarEmailDelUsuario() {
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}
d.addEventListener("submit",async e=>{
    if(e.target.matches(".form-consulta")){
        e.preventDefault()

        try{

            const options={
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    to:e.target.txtEmail.value,
                    subject:e.target.txtAsunto.value,
                    content:"Nombre: "+e.target.txtNombre.value+"\nMensaje: "+e.target.txtComentario.value
                })
            }
            const request = await fetch("api/mail",options)

            alert("Consulta enviada con éxito");
            location.reload()
        }catch(err){

        }

    }

})

function cerrarSesion(){
    const $cerrar=document.getElementById('sign-off')
    document.addEventListener("click",async e=>{
        if(e.target===$cerrar){
            localStorage.removeItem('token')
            localStorage.removeItem('email')

        }
    })

}