var isPaused = true;
var time;
var socket = io();

$(this).ready(function() {
  setPauseButtonText();
  timeString = $("#clock").text();
  time =
    parseInt(timeString.substring(0, 2)) * 3600 +
    parseInt(timeString.substring(3, 5)) * 60 +
    parseInt(timeString.substring(6, 8));
  socket.emit("server time init", time);
  timerInterval = setInterval(function() {
    if (!isPaused) {
      time -= 1;
      $("#clock").text(formatTime(time));
    }
  }, 1000);
});

$("#pause-button").click(function() {
  console.log("pause button click");
  if (isPaused) {
    isPaused = false;
    socket.emit("start timer", time);
  } else {
    isPaused = true;
    socket.emit("stop timer", time);
  }
});

function formatTime(seconds) {
  let hours = parseInt(seconds / 3600);
  seconds -= hours * 3600;
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;

  let formattedHours;
  let formattedMinutes;
  let formattedSeconds;

  if (hours < 10) {
    formattedHours = "0" + hours;
  } else {
    formattedHours = String(hours);
  }

  if (minutes < 10) {
    formattedMinutes = "0" + minutes;
  } else {
    formattedMinutes = String(minutes);
  }

  if (seconds < 10) {
    formattedSeconds = "0" + seconds;
  } else if(seconds >=0) {
    formattedSeconds = String(seconds);
  } else {
    formatted = "00"
  }

  let timeString =
    formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;

  return timeString;
}

function setPauseButtonText() {
  console.log("setPause hit");
  console.log(isPaused);
  if (isPaused) {
    $("#pause-button").text("Play");
  } else {
    $("#pause-button").text("Pause");
  }
}

//Socket listeners to determine when timer is start/stopped from admin.
socket.on("stop timer", () => {
  isPaused = true;
  setPauseButtonText();
});

socket.on("start timer", () => {
  isPaused = false;
  setPauseButtonText();
});

socket.on("change timer", newTime => {
  time = newTime;
  $("#clock").text(formatTime(time));
});

socket.on("new round", data => {
  time = data.time;
  $("#clock").text(formatTime(time));
  $("#round").text(data.round);
});

$(this).ready(socket.emit("new page"));

socket.on("new page load", data => {
  time = data.time;
  isPaused = data.pause;
  $("#clock").text(formatTime(time));
  $("#round").text(data.round);
});
