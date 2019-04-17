// eslint-disable-next-line eslint prefer-arrow-callback
var socket = io();

socket.on("terror update", terrorVal => {
  console.log(terrorVal);
  //TODO: update the terror val HTML here
});

socket.on("global modal post", data => {
  console.log(data);
  //TODO: update the modal text value here
  //also .show the modal
});
