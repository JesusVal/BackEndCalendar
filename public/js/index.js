
fetch('http://localhost:3000/api/user',
{
    method: 'GET',
    // mode: 'no-cors',
    headers: {
        'x-auth-user': 'token1'
    }
    
}).then( res => res.json())
.then( data => {
    console.log(data);
}).catch( err => console.log(err));