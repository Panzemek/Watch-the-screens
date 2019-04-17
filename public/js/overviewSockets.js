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

socket.on("global effect submit", data => {
  console.log(data);
  //refresh global effect page with values here
});

socket.on("hide article", data => {
  var placeholder = [];
  var index = placeholder.indexOf(data.id);
  if (index !== -1) {
    placeholder.splice(index, 1);
  }
  console.log(data);
  //remove article from articles array here
});

socket.on("show article", data => {
  var placeholder = [];
  placeholder.push(data);
});

//adds a new article to the array of articles
//one idea for this - store locally on admin and overview (with the exact same name)
//this JS exists on both pages, so it will handle both.
socket.on("new article", data => {
  console.log(data);
  var placeholder = [];
  //TODO: what exactly does data object look like?
  placeholder.unshift(data.article);
});

socket.on("new page load", data => {
  console.log("new page recieved");
  time = moment(data.time);
  console.log(time);
  isPaused = data.pause;
});
