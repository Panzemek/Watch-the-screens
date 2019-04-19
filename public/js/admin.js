//Update Terror button click
var socket = io();

$("#terror-button").click(function() {
  console.log($("#admin-container").data("game"));
  data = {
    terror: $("#terror-tracker-text").val(),
    id: $("#admin-container").data("game")
  };
  $.ajax("/api/updateTerror", {
    type: "put",
    data: {
      terror: $("#terror-tracker-text").val(),
      id: $("#admin-container").data("game")
    }
  }).then(socket.emit("terror update", data));
});

$("#riot-button").click(function() {
  data = {
    rioters: $("#riot-tracker-text").val(),
    id: $("#admin-container").data("game")
  };
  $.ajax("/api/updateRioters", {
    type: "put",
    data: {
      rioters: $("#riot-tracker-text").val(),
      id: $("#admin-container").data("game")
    }
  }).then(socket.emit("riot update", data));
});

$("#edit").click(() => {
  //TODO: the following line of code will likely need some fiddling
  var newTimeVal = $("#update-time-text").val();
  socket.emit("change timer", newTimeVal);
});

//Send global post button click
$("#global-post-submit-button").click(function() {
  console.log($("#global-post-text").val(), $("#global-post-duration").val());
  modalData = {
    text: $("#global-post-text").val(),
    duration: $("#global-post-duration").val()
  };
  $.ajax("/api/postGlobal", {
    type: "post",
    data: {
      text: $("#global-post-text").val(),
      duration: $("#global-post-duration").val()
    }
  }).then(socket.emit("global modal post", modalData));
  $("#global-post-form")
    .find(".global-post-control")
    .val("");
});

//Update subsequent round time
$("#default-time-button").click(function() {
  console.log($("#default-time-text").val());
  var defVal = $("#default-time-text").val();
  $.ajax("/api/updateDefaultTime", {
    type: "put",
    data: {
      // eslint-disable-next-line camelcase
      round_duration: $("#default-time-text").val()
    }
  }).then(socket.emit("def round changed", defVal));
});

//TODO: update to handle stuff
// $("#link-ul").ready(function() {
//   $("#link-ul").append(location.hostname + "/1/newsViewer");
// });

//Listener for game end confirm. Enables button only when text box reads CONFIRM.
$("#end-game-confirm-text").keyup(function() {
  if ($(this).val() === "CONFIRM") {
    $("#end-game-confirm-button").prop("disabled", false);
  } else {
    $("#end-game-confirm-button").prop("disabled", true);
  }
});

$("#end-game-confirm-button").click(function() {
  console.log("GAME OVER, MAN!");
  $.ajax("/api/endGame", {
    type: "put",
    data: { id: $("#admin-container").data("game") }
  }).then(socket.emit("game ended", true));
});

//Sends put call to db toggling whether or not an article is visible.
$("#toggle-article-button").click(function() {
  var newState;
  var selected = $("#toggle-article-dropdown option:selected");
  if (selected.data("hidden")) {
    newState = false;
    console.log("Toggling to show");
  } else {
    newState = true;
    console.log("Toggling to hide");
  }
  $.ajax("/api/toggleArticle", {
    type: "put",
    data: {
      id: selected.val(),
      // eslint-disable-next-line camelcase
      is_hidden: newState
    }
    //sockets for article hide state
  }).then(result => {
    if (result[0] !== 0) {
      socket.emit("hide article", result[1]);
    }
  });
});

//Changes the state of the text on the article dropdown submit button based on whether or not the article is already hidden or not.
$("#toggle-article-dropdown").change(function() {
  if ($("#toggle-article-dropdown option:selected").data("hidden")) {
    $("#toggle-article-button").text("Show");
  } else {
    $("#toggle-article-button").text("Hide");
  }
});

//Binds an event listener to each edit global event button. On click, a modal is shown with a form filled out with the editable values of the global event (current values already filled).
$(".global-event-button").click(function() {
  $("#global-effect-text").val($(this).data("event_text"));
  $("#global-effect-start-trigger-type").val(
    $(this).data("start_trigger_type")
  );
  $("#global-effect-start-trigger-value").val(
    $(this).data("start_trigger_value")
  );
  $("#global-effect-end-trigger-type").val($(this).data("end_trigger_type"));
  $("#global-effect-end-trigger-value").val($(this).data("end_trigger_value"));
  if ($(this).data("is_hidden") === true) {
    $("#global-effect-is-hidden").prop("checked", true);
  } else {
    console.log("false", $(this).data("is_hidden"));
    $("#global-effect-is-hidden").prop("checked", false);
  }
  $("#global-effect-submit-button").data("effect-id", $(this).data("id"));
});

//Sends an api put call to update a global effect.
$("#global-effect-submit-button").click(function() {
  dataForSocket = {
    id: $("#global-effect-submit-button").data("effect-id"),
    event_text: $("#global-effect-text").val(),
    start_trigger_type: $("#global-effect-start-trigger-type").val(),
    start_trigger_value: $("#global-effect-start-trigger-value").val(),
    end_trigger_type: $("#global-effect-end-trigger-type").val(),
    end_trigger_value: $("#global-effect-end-trigger-value").val(),
    // eslint-disable-next-line camelcase
    is_hidden: $("#global-effect-is-hidden").prop("checked")
  };
  $.ajax("/api/updateGlobalEffect", {
    type: "put",
    data: {
      id: $("#global-effect-submit-button").data("effect-id"),
      event_text: $("#global-effect-text").val(),
      start_trigger_type: $("#global-effect-start-trigger-type").val(),
      start_trigger_value: $("#global-effect-start-trigger-value").val(),
      end_trigger_type: $("#global-effect-end-trigger-type").val(),
      end_trigger_value: $("#global-effect-end-trigger-value").val(),
      // eslint-disable-next-line camelcase
      is_hidden: $("#global-effect-is-hidden").prop("checked")
    }
  }).then(res => {
    var id = $("#admin-container").data("game");
    $.ajax(id + "/overviewGlobalEffects", {
      type: "get"
    }).then(res => {
      socket.emit("global effect submit", res);
    });
  });
});

//Sends an api put call to update a global effect.
$("#global-effect-add-submit-button").click(function() {
  dataForSocket = {
    event_text: $("#global-effect-textadd").val(),
    start_trigger_type: $("#global-effect-start-trigger-typeadd").val(),
    start_trigger_value: $("#global-effect-start-trigger-valueadd").val(),
    end_trigger_type: $("#global-effect-end-trigger-typeadd").val(),
    end_trigger_value: $("#global-effect-end-trigger-valueadd").val(),
    // eslint-disable-next-line camelcase
    is_hidden: $("#global-effect-is-hiddenadd").prop("checked")
  };
  $.ajax("/api/newGlobalEffect", {
    type: "post",
    data: {
      gameId: $("#admin-container").data("game"),
      effect_text: $("#global-effect-textadd").val(),
      start_trigger_type: $("#global-effect-start-trigger-typeadd").val(),
      start_trigger_value: $("#global-effect-start-trigger-valueadd").val(),
      end_trigger_type: $("#global-effect-end-trigger-typeadd").val(),
      end_trigger_value: $("#global-effect-end-trigger-valueadd").val(),
      // eslint-disable-next-line camelcase
      is_hidden: $("#global-effect-is-hiddenadd").prop("checked"),
      round_created: parseInt($("#round").html())
    }
  }).then(res => {
    var id = $("#admin-container").data("game");
    $.ajax(id + "/overviewGlobalEffects", {
      type: "get"
    }).then(res => {
      socket.emit("global effect submit", res);
    });
  });
});

socket.on("new article", art => {
  console.log("New article posted!");
  $("#admin-refresh").removeClass(".hidden");
});

socket.on("hide article", () => {
  $("#admin-refresh").removeClass(".hidden");
});

socket.on("global effect change", art => {
  $("#admin-refresh").removeClass(".hidden");
});

socket.on("new global mod", val => {
  $("#admin-refresh").removeClass(".hidden");
});
