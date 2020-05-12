

document.getElementById('btnLogin').addEventListener('click', function(e){
    e.preventDefault();

    let user = document.getElementById('Username').value;
    let pass = document.getElementById('Password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            password: pass
        })
    })
    .then( res => res.json() )
    .then( data => {
        if( Object.prototype.hasOwnProperty.call(data, 'error') ){
            alert('La contraseña y usuario no coinciden');
        }else{
            localStorage.token = data.token;
            window.location.href = './calendar.html';
        }
    })
    .catch( err => console.log(err));
});