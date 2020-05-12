const TokenGenerator = require('uuid-token-generator');
const {DBUser, DBCalendar} = require('./dbConnection/Users.js');

let token = new TokenGenerator(128, TokenGenerator.BASE16);

// console.log(token);
// console.log(TokenGenerator.BASE16);
// console.log(token.generate());

// DBUser.getUserbyToken( 'token1' , (docs) => {
//     console.log(docs.length);
// }, (err) => {
//     console.log(err);
// });


// DBCalendar.findOne({userid:1}, 'data', (err, docs) => {
//     if(docs){
//         console.log(docs);
//         console.log('---------');
//         console.log(docs.data[0]._id);
//         console.log( typeof docs.data[0]._id.toString());
//     }
//     if(err){
//         console.log(err);
//     }

// });
// ------------------------------------------
// DBCalendar.findOne( {"data._id": "5eb5e9b4323c6c053874dc11"},{ _id : false, data: {$elemMatch : { _id: "5eb5e9b4323c6c053874dc11" }} } ,  (err,docs) => {
//     if(docs){
//         console.log(docs);
//     }
//     if(err){
//         // console.log('fallo');
//         console.log(err);
//     }
// });

// DBCalendar.findOne( {"data._id": "5eb5e9b4323c6c053874dc11"} ,  (err,docs) => {
//     if(docs){
//         console.log(docs);
//     }
//     if(err){
//         // console.log('fallo');
//         console.log(err);
//     }
// });

let datatemp = {
                title: "Event Test4",
                start: "2019-05-03T13:00:00",
                end: "2019-05-03T14:00:00",
                extendedProps: {
                  image: "https://i.imgur.com/bPQANEr.png",
                  descripcion: "Se logro no sabemos como",
                  status: "completado"
                }
              };


// DBCalendar.findOneAndUpdate( {"userid" : 2}, {$push: { data: datatemp  }}, (err,docs) =>{
//     if(docs){
//         console.log(docs);
//     }
//     if(err){
//         // console.log('fallo');
//         console.log(err);
//     }
// } );

// DBCalendar.findOneAndUpdate( {"data._id": "5eb5e9b4323c6c053874dc11"}, {$pull: {data: {_id: "5eb5e9b4323c6c053874dc11"} }} , (err, docs) => {
//     if(docs){
//         console.log(docs);
//     }
//     if(err){
//         // console.log('fallo');
//         console.log(err);
//     }
// });

DBCalendar.findOneAndUpdate( {"data._id": "5eb9afd8dad4e6336cef2e61"}, {$set: { "data.$" : datatemp} }, (err,docs) => {

    if(docs){
        console.log(docs);
    }
    if(err){
        // console.log('fallo');
        console.log(err);
    }

});



// DBUser.getUsers( (docs) =>{
//     res.status(200).json(docs);
// } ,
// (err) => res.status(400).json({error: err}) );

// function createDataDBCalendar(){
//     let newcalendar = {
//         userid: 2, 
//         data:[
//           {
//             title: "Event Test1",
//             start: "2020-04-03T13:00:00",
//             end: "2020-04-03T14:00:00",
//             extendedProps: {
//               image: "https://i.imgur.com/bPQANEr.png",
//               descripcion: "una descripcion de test",
//               status: "pendiente"
//             }
//           },
//           {
//             title: "Event Test2",
//             start: "2020-04-15T13:00:00",
//             end: "2020-04-15T14:00:00",
//             extendedProps: {
//               image: "https://i.imgur.com/bPQANEr.png",
//               descripcion: "una descripcion de test",
//               status: "pendiente"
//             }
//           }
//         ]
//     }

//     let dbcalendar = new DBCalendar(newcalendar);

//     dbcalendar.save().then( doc => console.log(doc) );
// }

// createDataDBCalendar();