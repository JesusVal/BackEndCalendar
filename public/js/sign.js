
document.getElementById('btnSignIn').addEventListener('click', function(e){
    e.preventDefault();

    let user = document.getElementById('Username').value;
    let mail = document.getElementById('Email').value;
    let pass1 = document.getElementById('Password').value;
    let pass2 = document.getElementById('PasswordVerification').value;


    console.table({
        user,
        mail,
        pass1,
        pass2
    });

    if( user.length < 6 )   {alert('El usuario debe contener al menos 6 caracteres'); return;}
    if( mail.length < 5 )   {alert('Falta un email válido'); return;}
    if( pass1.length < 6 )  {alert('Falta ingresar la contraseña'); return;}
    if( pass2.length < 6 )  {alert('Falta ingresar la  verificación de la contraseña'); return;}

    if(pass1.localeCompare(pass2) != 0){
        alert('Las constraseñas no coinciden')
        return;
    }

    fetch('/api/signin',{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            password: pass1,
            email: mail
        })
    })
    .then( res => res.json() )
    .then( data => {
        
        if( Object.prototype.hasOwnProperty.call(data, 'error') ){
            alert(data.error);
        }else{
            console.log('El usuario fue creado :D');
            alert('El usuario ha sido creado');
            window.location.href = './Log.html';
        }

    })
    .catch( err => console.log(err) );

    console.log('login');
});
