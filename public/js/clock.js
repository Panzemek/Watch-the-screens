var isPaused = true;
var time;
var socket = io();

$(this).ready(function() {
  //TODO: put a timer start socket call here
  isPaused = $("#clock").data("is_paused");
  setPauseButtonText();
  time = moment($("#clock").text(), "mm:ss");
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
  $.ajax("/api/toggleGamePauseState", {
    type: "put",
    data: {
      is_paused: isPaused,
      id: $("#admin-container").data("game")
    }
  });
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

//change timer does not start the time, should probabaly only work when timer is stopped
socket.on("change timer", newTime => {
  //TODO: Where are we getting new timer value from?
  time = newTime;
});

$(this).ready(socket.emit("new page"));

//TODO: This is where the button PLAY/PAUSE needs to be fixed
socket.on("new page load", data => {
  console.log("new page recieved");
  time = moment(data.time);
  console.log(time);
  isPaused = data.pause;
});
