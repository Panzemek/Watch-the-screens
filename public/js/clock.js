var isPaused = true;
var time;
var socket = io();

$(this).ready(function() {
  //TODO: put a timer start socket call here
  //isPaused = $("#clock").data("is_paused");
  setPauseButtonText();
  time = moment($("#clock").text(), "mm:ss");
  timerInterval = setInterval(function() {
    if (!isPaused) {
      console.log(Object.values(time));
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
  isPaused = true;
  setPauseButtonText();
});

socket.on("start timer", timerVal => {
  time = moment(timerVal);
  isPaused = false;
  setPauseButtonText();
});

socket.on("change timer", newTime => {
  time = moment(newTime, "mm:ss");
  $("#clock").text(time.format("mm:ss"));
});

$(this).ready(socket.emit("new page"));

//TODO: This is where the button PLAY/PAUSE needs to be fixed
socket.on("new page load", data => {
  time = moment(data.time);
  isPaused = data.pause;
});
