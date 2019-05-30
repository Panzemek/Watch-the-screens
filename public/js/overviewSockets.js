// eslint-disable-next-line eslint prefer-arrow-callback
var socket = io();

socket.on("terror update", terrorVal => {
  console.log("Terror val is " + terrorVal);
  $("#rioters").html(terrorVal.terror);
});

socket.on("global modal post", data => {
  console.log(data);
  $("#modalBlastText").html(data.text);
  $("#modalBlast").modal("show");
});

socket.on("global effect submit", data => {
  console.log(data);
});

socket.on("hide article", data => {
  var placeholder = []; //TODO: replace with actual article array
  var index = placeholder.indexOf(data.id);
  if (index !== -1) {
    placeholder.splice(index, 1);
  }
  console.log(data);
  //remove article from articles array here
});

socket.on("show article", data => {
  var placeholder = []; //TODO: replace with actual article array
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
  time = data.time;
  console.log(time);
  isPaused = data.pause;
});
