$("#terror-button").click(function() {
  console.log($("#terror-tracker-text").val());
  $.ajax("/api/updateTerror", {
    type: "put",
    data: { terror: $("#terror-tracker-text").val() }
  });
});
