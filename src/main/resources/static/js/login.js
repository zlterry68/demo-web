document.addEventListener("DOMContentLoaded",e=>{

});

const d=document

const $form=d.querySelector(".user")

d.addEventListener("submit",async e=>{

    if(e.target===$form){
        e.preventDefault()
        try{

            const options={
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    email:e.target.txtEmail.value,
                    password:e.target.txtPassword.value
                })
            }
            const request = await fetch("api/login",options),
            respuesta= await request.text()
            if (respuesta !== 'FAIL') {
                localStorage.token = respuesta;
                localStorage.email = e.target.txtEmail.value;
                location.href = 'home.html';
            } else {
                alert("Las credenciales son incorrectas, intente nuevamente");
            }
        }catch(err){

        }

    }

})
/*
async function iniciarSesion() {
    let datos = {};
    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;


    const request = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    const respuesta = await request.text();
    if (respuesta != 'FAIL') {
        localStorage.token = respuesta;
        localStorage.email = datos.email;
        window.location.href = 'home.html';
    } else {
        alert("Las credenciales son incorrectas, intente nuevamente");
    }
}
*/