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
