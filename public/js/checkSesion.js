
console.log(localStorage.token);

fetch('/api/user', {
    method: 'GET',
    headers: {
        'x-auth-user': localStorage.token
    }
  })
  .then( res => res.json())
  .then( data => {

    if( Object.prototype.hasOwnProperty.call(data, 'error') ){
        console.log('token invalido');
        document.getElementById('navbaruser').hidden = true;
        document.getElementById('navbarlogin').hidden = false;
        document.getElementById('navbarsignin').hidden = false;
        document.getElementById('navbarlogout').hidden = true;
    }else{
        document.getElementById('navbaruser').innerText = data.user;
        document.getElementById('navbaruser').hidden = false;
        document.getElementById('navbarlogin').hidden = true;
        document.getElementById('navbarsignin').hidden = true;
        document.getElementById('navbarlogout').hidden = false;
        console.log('se arma banda');
    }
    // if(users.length > 0){
    //   document.getElementById('navbaruser').innerText = users[0].user;
    //   document.getElementById('navbarlogin').hidden = true;
    //   document.getElementById('navbarsignin').hidden = true;
    //   document.getElementById('navbarlogout').hidden = false;
    //   console.log('users:');
    //   console.log(users);
    //   loadCalendarData(users[0].userid);
    // }else{
    //   document.getElementById('navbaruser').hidden = true;
    //   document.getElementById('navbarlogin').hidden = false;
    //   document.getElementById('navbarsignin').hidden = false;
    //   document.getElementById('navbarlogout').hidden = true;
    // }
    
    console.log(localStorage.token);
    console.log('promise');
    console.log(data);
})
.catch(err => {
    console.log(err);
    console.log('aqui ando banda');
});

function logout(){
    localStorage.token = '';
    location.reload();
}