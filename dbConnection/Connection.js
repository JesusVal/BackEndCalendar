const mongoose = require('mongoose');

const URLConnection = 'mongodb+srv://user:user@cluster0-pc3ie.mongodb.net/Calendar?retryWrites=true&w=majority';


mongoose.connect(URLConnection, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then( () => console.log('Conectando a base de datos') )
.catch( (err) => console.log('No conectado, error: ', err) );


module.exports = mongoose;