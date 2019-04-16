var timerInterval;
var isPaused = false;
var time;
$(this).ready(function() {
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
  } else {
    isPaused = true;
  }
});
