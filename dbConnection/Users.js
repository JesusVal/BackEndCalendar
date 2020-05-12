const mongoose = require('./Connection');
const TokenGenerator = require('uuid-token-generator');


let userSchema = mongoose.Schema({
    userid: {
        type: Number,
        require: true,
        unique: true
    },
    user: String,
    email: String,
    password: String,
    token: String
});

let DBUser = mongoose.model('users', userSchema);

let calendarShema = mongoose.Schema({
    userid: Number,
    data: [{
        title: String,
        start: String,
        end: String,
        extendedProps: {
            image: String,
            descripcion: String,
            status: String
        }
    }]
});

let DBCalendar = mongoose.model('calendars', calendarShema);



// DBCalendar functions
function getCalendarbyUserID( userid, cbOk, cbErr){
    DBCalendar.findOne({userid: userid}, 'data', (err,docs) => {
        if(docs){
            console.log(docs);
            cbOk(docs);
        }
        if(err){
            console.log(err);
            cbErr(err);
        }
    });
}

function addEventCalendar( userid, newCalendar ,cbOk, cbErr){
    DBCalendar.findOneAndUpdate( {"userid" : userid}, {$push: { data: newCalendar  }}, (err,docs) =>{
        if(docs){
            console.log(docs);
            cbOk(docs);
        }
        if(err){
            // console.log('fallo');
            console.log(err);
            cbErr(err);
        }
    } );
}

function deleteEventCalendar( idEvent ,cbOk, cbErr ){

    DBCalendar.findOneAndUpdate( {"data._id": idEvent}, {$pull: {data: {_id: idEvent} }} , (err, docs) => {
        if(docs){
            console.log(docs);
            cbOk(docs);
        }
        if(err){
            // console.log('fallo');
            console.log(err);
            cbErr(err);
        }
    });
}

function updateStatusCalendar( _id, newStatus, cbOk, cbErr){
    DBCalendar.findOneAndUpdate( {"data._id": _id}, {$set: { "data.$.extendedProps.status" : newStatus } }, (err,docs) => {

        if(docs){
            console.log(docs);
            cbOk(docs);
        }
        if(err){
            // console.log('fallo');
            console.log(err);
            cbErr(err);
        }
    
    });
}

function updateEventCalendar( _id , newCalendar,cbOk, cbErr){
    DBCalendar.findOneAndUpdate( {"data._id": _id }, {$set: { "data.$" : newCalendar} }, (err,docs) => {

        if(docs){
            console.log(docs);
            cbOk(docs);
        }
        if(err){
            // console.log('fallo');
            console.log(err);
            cbErr(err);
        }
    
    });
}



//DBUser functions
function getUsers(cbOk, cbErr){
    DBUser.find({}, (err,docs) => {
        if(docs){
            // console.log('Esta ok');
            console.log(docs);
            cbOk(docs);
        }
        if(err){
            // console.log('hubo un error');
            console.log(err);
            cbErr(err);
        }
    })
}

function getUserbyToken (token, cbOk, cbErr){
    DBUser.find({token: token}, (err, docs) => {
        if(docs){
            console.log(docs);
            cbOk(docs);
        }
        if(err){
            console.log(err);
            cbErr(err);
        }
        // console.log('userbytoken no se que pasó')
    });
}

function getTokeninLogin (user, password, cbOk, cbErr){
    DBUser.find({user: user, password: password}, 'token', (err, docs) => {
        if(docs){
            console.log(docs);
            cbOk(docs);
        }
        if(err){
            console.log(err);
            cbErr(err);
        }
    });
}

function signinNewUser( newuser, newemail, newpassword, cbOk, cbErr ){

    DBUser.find({}, 'userid user email token', (err,docs) => {
        if(docs){

            let flag = true;
            let flagtoken = true;
            let newid = 0;

            docs.forEach( elem => {
                flag = (elem.user.localeCompare(newuser) == 0 || elem.email.localeCompare(newemail)==0) ? flag&&false : flag&&true;
                newid = (elem.userid >= newid) ? elem.userid + 1 : newid ;
            });

            if(flag == true){

                let token = new TokenGenerator(128, TokenGenerator.BASE16);
                let newtoken;

                do{
                    newtoken = token.generate();
                    docs.forEach( elem => {
                        flagtoken = (elem.token.localeCompare(newtoken) == 0) ? flagtoken&&false : flagtoken&&true;
                    });
                }while( flagtoken == false);

                let newdata = {
                    userid: newid, 
                    user: newuser + '', 
                    email: newemail + '', 
                    password: newpassword + '', 
                    token: newtoken + ''
                };
                let newCalendarData = {
                    userid: newid,
                    data: []
                };

                let Data = new DBUser(newdata);
                let CalendarData = new DBCalendar(newCalendarData);

                Data.save().then( (doc) => console.log(doc) );
                CalendarData.save().then( (doc => console.log(doc)) );

                cbOk(Data);

            }else{
                cbErr('Ya existe el usuario');
            }



            // console.log(docs);
            
        }
        if(err){
            console.log(err);
            cbErr(err);
        }
    });
}

function createNewUser(){
    let newUser = {
        userid: 1, 
        user: "user1", 
        email: "em@il1.com", 
        password: "pass1", 
        token: "token1"
    }
    let user = new DBUser(newUser);

    user.save().then((doc) => console.log(doc));
}

function createDataDBCalendar(){
    let newcalendar = {
        userid: 1, 
        data:[
          {
            title: "Event Test1",
            start: "2020-04-03T13:00:00",
            end: "2020-04-03T14:00:00",
            extendedProps: {
              image: "https://i.imgur.com/bPQANEr.png",
              descripcion: "una descripcion de test",
              status: "pendiente"
            }
          }
        ]
    }

    let dbcalendar = new DBCalendar(newcalendar);

    dbcalendar.save().then( doc => console.log(doc) );
}

// createDataDBCalendar();

// createNewUser();


DBUser.getUsers = getUsers;
DBUser.getUserbyToken = getUserbyToken;
DBUser.getTokeninLogin = getTokeninLogin;
DBUser.signinNewUser = signinNewUser;

DBCalendar.getCalendarbyUserID = getCalendarbyUserID;
DBCalendar.addEventCalendar = addEventCalendar;
DBCalendar.deleteEventCalendar = deleteEventCalendar;
DBCalendar.updateStatusCalendar = updateStatusCalendar;
DBCalendar.updateEventCalendar = updateEventCalendar;


module.exports = {DBUser, DBCalendar};
// createNewUser();