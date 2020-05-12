const express = require('express');
// const fs = require('fs');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', usersRouter);

app.use((error, req, res, next) => {
    res.status(400).json({
        status: 'error',
        message: error.message,
    });
});

app.use('/', express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     res.send('BackEnd is running');
// });

app.listen(port, () => console.log('Serven running in http://localhost:' + port));

// Connection to database moongose
// user: user
// password: user