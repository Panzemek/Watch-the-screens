//admin post functions and IO calls

//************************/ TODO: Add in functionality for this to also handle terror track/rioters values (just stored in a different table)
//on stats post 
var socket = io();
var value = "placeHolder"
function statsPost() { //this should fire whenever one of the global mods is updated
    //update database call goes here
  socket.emit('updated val', value);
}
//JS for 'overview' page -> do these need to be wrapped in jquery?  the message will be broadcast to all 'sockets' but will only be processed by this one
var socket = io();
socket.on('updated val', (newVal) => {
    //code to update values here
    //alternatively, have an ajax call here that pulls db values, and updates all values.
})
//************************/

//************************/
//message 'send' from admin
function sendUpdate() {
    socket.emit("modal update blast", message);
}
//message popup
socket.on("modal update blast", (modalUpdBl) => {
    //modal text change to modalUpdBl
    modal.show
    //are we having these show for limited amount of time?  if so that logic gets triggered here
})

//************************/

//************************/
//timer logic here - TODO:gonna have to thing this one through.
//************************/

//************************/
//TODO: server round end emit call/functionality goes here
//************************/






// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//       console.log('message: ' + msg);
//     });
//   });

//   $(function () {
//     var socket = io();
//     $('form').submit(function(e){
//       e.preventDefault(); // prevents page reloading
//       socket.emit('chat message', $('#m').val());
//       $('#m').val('');
//       return false;
//     });
//   });