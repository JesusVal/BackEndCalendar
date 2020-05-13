
let calendar;

fetch('/api/calendar',{
    method: 'GET',
    headers: {
        'x-auth-user': localStorage.token
    }
})
.then( res => res.json())
.then( data => {

    let calendarEl = document.getElementById('calendar');
    

    data.forEach(elem => {
        elem.id = elem._id;
        delete elem._id;
    });

    // console.log(data);

    calendar = new FullCalendar.Calendar( calendarEl, {
        plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        footer: {
          right: 'AgregarEventoBtn'
        },
        defaultDate: Date.now(),
        navLinks: true,
        businessHours: true,
        editable: true,
        events: data,
    
        eventClick: function(info) {
    
          let container = document.getElementById('detail-content');
    
          container.innerHTML = 
          `<h4>${info.event.title}</h4>
          <p>status: ${info.event.extendedProps.status}<p>
          <p>Fecha de inicio: ${info.event.start}</p>
          ${(info.event.end != undefined) ? `<p>Fecha de fin: ${info.event.end} </p>` : '' }
          ${ (info.event.extendedProps.descripcion.length > 1) ? `<p>descripcion: ${info.event.extendedProps.descripcion}</p>` : '' }
          ${(info.event.extendedProps.image.length > 1) ? `<img src="${info.event.extendedProps.image}" alt="eventimage" height=auto width=100%>` : `` }
          <br>
          <button type="button" class="btn btn-info" id="editarstatus">Cambiar status</button>
          <button type="button" class="btn btn-warning" id="editarEvento">Editar</button>
          <button type="button" class="btn btn-danger" id="eliminarEvento">Eliminar</button>`;
          
          // change the border color just for fun
          // ${(info.event.url.length > 1) ? `<img src="${info.event.url}" alt="eventimage" height=auto width=100%>` : `` }
          info.el.style.borderColor = 'red';
          console.log('im showing details');
        },
    
        customButtons: {
          AgregarEventoBtn: {
              text: "Agregar evento",
              click:function()
              {
                //   alert("agregarbtn");
                  $('#modelId').modal('toggle');  
              }
          }
        }
    
      });


      calendar.render();



})
.catch( err => alert(err));


// AddEventCalendar
document.getElementById('agregarbtnfechamodal').addEventListener('click', function(){

    let title = document.getElementById('tituloagregar').value;
    let descripcion = document.getElementById('descripcionagregar').value;

    let dia_inicio = document.getElementById('dateInicioagregar').value;
    let hora_inicio = document.getElementById('horaInicioagregar').value;

    let dia_fin = document.getElementById('dateFinalagregar').value;
    let hora_fin = document.getElementById('horaFinalagregar').value;

    let url = document.getElementById('urlagregar').value;


    if( title.length < 1 ){ alert('Debe de tener un título'); return;}
    if( dia_inicio < 10 ){ alert('Debe de tener una fecha de inicio'); return;}

    let newCalendar = {
        title: title,
        start: (dia_inicio+'T'+hora_inicio),
        end: (`${(dia_fin < 1) ? dia_inicio : dia_fin}T${hora_fin}`),
        extendedProps: {
            descripcion: descripcion,
            status: 'pendiente',
            image: url + ''
            }
    };     

    fetch('/api/calendar/add',{
        method: 'POST',
        headers: {
            'x-auth-user': localStorage.token,
            'content-type': 'application/json'
        },
        body: JSON.stringify(newCalendar)
    })
    .then( res => res.json())
    .then( data => {
        // console.log(data.data[data.data.length-1]);
        newCalendar.id = data.data[data.data.length-1]._id;
        calendar.addEvent(newCalendar);
        $('#modelId').modal('hide'); 

    })
    .catch( err => console.log(err));


});