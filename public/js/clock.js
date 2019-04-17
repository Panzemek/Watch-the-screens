var isPaused = false;
var time;

$(this).ready(function() {
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
  } else {
    isPaused = true;
    setPauseButtonText();
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
