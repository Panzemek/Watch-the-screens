var isPaused = true;
var time;
var socket = io();

$(this).ready(function() {
  //TODO: put a timer start socket call here
  //isPaused = $("#clock").data("is_paused");
  setPauseButtonText();
  time = moment($("#clock").text(), "mm:ss");
  socket.emit("server time init", time);
  timerInterval = setInterval(function() {
    if (!isPaused) {
      time.subtract(1, "second");
      $("#clock").text(time.format("mm:ss"));
    }
  }, 1000);
});

$("#pause-button").click(function() {
  if (isPaused) {
    isPaused = false;
    setPauseButtonText();
    socket.emit("start timer", time);
  } else {
    isPaused = true;
    setPauseButtonText();
    socket.emit("stop timer", time);
  }
  // $.ajax("/api/toggleGamePauseState", {
  //   type: "put",
  //   data: {
  //     is_paused: isPaused,
  //     id: $("#admin-container").data("game")
  //   }
  // });
});

function setPauseButtonText() {
  if (isPaused) {
    $("#pause-button").text("Play");
  } else {
    $("#pause-button").text("Pause");
  }
}

//Socket listeners to determine when timer is start/stopped from admin.
socket.on("stop timer", timerVal => {
  time = moment(timerVal);
  console.log(time);
  isPaused = true;
  setPauseButtonText();
});

socket.on("start timer", timerVal => {
  time = moment(timerVal);
  console.log(time);
  isPaused = false;
  setPauseButtonText();
});

socket.on("change timer", newTime => {
  console.log(newTime);
  time = moment(newTime, "mm:ss");
  console.log(time);
  $("#clock").text(time.format("mm:ss"));
});

socket.on("new round", data => {
  var newRoundTime = moment(data.time);
  time = moment(newRoundTime);
  $("#clock").text(time.format("mm:ss"));
  $("#round").text(data.round);
});

$(this).ready(socket.emit("new page"));

socket.on("new page load", data => {
  time = moment(data.time);
  isPaused = data.pause;
  $("#clock").text(time.format("mm:ss"));
  $("#round").text(data.round);
});
