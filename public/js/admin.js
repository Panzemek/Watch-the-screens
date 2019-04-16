//Update Terror button click
$("#terror-button").click(function() {
  console.log($("#terror-tracker-text").val());
  $.ajax("/api/updateTerror", {
    type: "put",
    data: { terror: $("#terror-tracker-text").val() }
  });
});

//Send global post button click
$("#global-post-submit-button").click(function() {
  console.log($("#global-post-text").val(), $("#global-post-duration").val());
  $.ajax("/api/postGlobal", {
    type: "post",
    data: {
      text: $("#global-post-text").val(),
      duration: $("#global-post-duration").val()
    }
  });
  $("#global-post-form")
    .find(".global-post-control")
    .val("");
});

//Update subsequent round time
$("#default-time-button").click(function() {
  console.log($("#default-time-text").val());
  $.ajax("/api/updateDefaultTime", {
    type: "put",
    data: {
      // eslint-disable-next-line camelcase
      round_duration: $("#default-time-text").val()
    }
  });
});

$("#link-ul").ready(function() {
  $("#link-ul").append(location.hostname + "/1/newsViewer");
});

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
  });
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

$(".global-event-button").click(function() {
  console.log("hello!");
  console.log($(this).data("event_text"));
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
    console.log("true", $(this).data("is_hidden"));
    $("#global-effect-is-hidden").prop("checked", true);
  } else {
    console.log("false", $(this).data("is_hidden"));
    $("#global-effect-is-hidden").prop("checked", false);
  }
  $("#global-effect-submit-button").data("effect-id", $(this).data("id"));
});

$("#global-effect-submit-button").click(function() {
  $.ajax("/api/toggleArticle", {
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
  });
});
