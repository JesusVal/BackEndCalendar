const router = require('express').Router();
const {DBUser, DBCalendar} = require('../dbConnection/Users.js');

// const randomize = require('randomatic');


//Regresa los usuarios registrados 
router.get('/users', autentificarToken, (req, res) => {
    console.log('In users');
    // console.log()
    // res.send('hola');
    // res.header("Content-Type",'application/json');

    DBUser.getUsers( (docs) =>{
        res.status(200).send(docs);
    } ,
    (err) => res.status(400).json({error: err}) );

    // res.status(200).json(DBUser.getUsers);

});

//Logea a un usuario
router.post('/login', (req, res) => {
    console.log('In login');

    if( (req.get('content-type') !== undefined) && (req.get('content-type').localeCompare('application/json') == 0) ){

        let data = req.body;

        if( Object.prototype.hasOwnProperty.call(data, 'user') && Object.prototype.hasOwnProperty.call(data, 'password') ){

            DBUser.getTokeninLogin(data.user, data.password,
                (docs) => res.status(200).send({token: docs}),
                (err) => res.status(404).send({error:err}));

        }else{
            res.status(404).send({error: 'Faltan datos de petición'});
        }



    }else{
        console.log('header incorrecot');
        res.status(401).send({error: 'Header incorrecto debe ser content-type:application/json'});
    }

});

//Crea un nuevo usuario
router.post('/signin', (req, res) => {
    console.log('In Sign in');

    if( (req.get('content-type') !== undefined) && (req.get('content-type').localeCompare('application/json') == 0) ){

        let data = req.body;

        if( Object.prototype.hasOwnProperty.call(data, 'user') && Object.prototype.hasOwnProperty.call(data, 'password') && Object.prototype.hasOwnProperty.call(data, 'email')){
            DBUser.signinNewUser(data.user, data.email, data.password,
                (doc) => res.status(201).send('Usuario creado'),
                (err) => res.status(401).send({error:err}));
        }else{
            res.status(404).send({error: 'Faltan datos de petición'});
        }


    }else{
        res.status(401).send({error: 'Header incorrecto'});
    }
});


router.get('/calendar', autentificarToken, (req,res) => {
    console.log('In GET Calendar');

    DBCalendar.getCalendarbyID(req.userid,
        (docs) => res.status(200).send(docs.data),
        (err) => {
            console.log(err);
            res.status(404).send({err:err});
            return;
        });

});

router.post('/calendar/add', autentificarToken, (req, res) =>{
    console.log('ADD Event');
    let newCalendar = req.body;

    DBCalendar.addEventCalendar( req.userid, newCalendar,
    (docs) => {res.status(201).send('Evento agregado')},
    (err) =>  {res.status(404).send({err:err});});

});

router.post('calendar/delete', autentificarToken, (req, res) => {
    console.log('Delete Event');

    let idEvent = req.body._id;

    DBCalendar.deleteEventCalendar( idEvent, 
    (docs) => {res.status(200).send('Evento eliminado')},
    (err) => {res.status(400).send({err:err})});

});

router.post('calendar/updatestatus', autentificarToken, (req, res) => {
    console.log('Update Status');

    let idEvent = req.body._id;
    let newStatus = req.body.status;

    DBCalendar.updateStatusCalendar( idEvent, newStatus,
        (docs) => {res.status(200).send('Status Actualizado')},
        (err) => { res.status(400).send({err:err}); });

});

router.post('calendar/updateEvent', autentificarToken, (req, res) => {
    console.log('Update Event');

    let idEvent = req.body._id;
    let newCalendar = req.body.newCalendar;

    DBCalendar.updateEventCalendar( idEvent, newCalendar,
        (docs) => {res.status(200).send('Evento Actualizado')},
        (err) => { res.status(400).send({err:err}); });

});







function autentificarToken (req, res, next){
    console.log(req.get('x-auth-user'));

    if( req.get('x-auth-user') ){

        DBUser.getUserbyToken(req.get('x-auth-user'),
        (docs) => {
            // console.log(docs.length);
            if(docs.length > 0){
                req._id = docs[0]._id;
                req.userid = docs[0].userid;
                console.log('------------');
                console.log('_id: ' + req._id);
                console.log('userid: ' + req.userid);
                console.log('docs: ' + docs);
                console.log('------------');
                next();
                return;
            }else{
                res.status(404).send({error: "token invalido"});
                // console.log('valio');
                return;
            }

        }, (err) => {
            console.log(err);
            res.status(404).send({err:err});
            return;
        });

        console.log('termino');

    }else{
        res.status(401).send({error: 'Falta header x-auth-user'});
    }

}




module.exports = router;