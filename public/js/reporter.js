var socket = io();

$("#article-preview-button").click(function() {
  event.preventDefault();
  $("#author").html($("#input-author").val());
  $("#image").attr("src", $("#input-image").val());
  $("#title").html($("#input-title").val());
  $("#article-text").text($("#input-body").val());
});


$("#article-submit-button").click(function() {
  var newArticle = {
    title: $("#input-title").val(),
    // eslint-disable-next-line camelcase
    img_url: $("#input-image").val(),
    author: $("#input-author").val(),
    // eslint-disable-next-line camelcase
    article_body: $("#input-body").val(),
    // eslint-disable-next-line camelcase
    gameId: $("#reporter-container").data("game"),
    // eslint-disable-next-line camelcase
    network_short: $("#reporter-container").data("network-short"),
    is_hidden: false
  };

  if (formFilled(newArticle)) {
    //TODO: Need to make an API call to post this info but it needs round_created, game_id, and network_id added to it (maybe through params? and passing the object through the body?)
    //Clears the form
    $("#input-author").val("");
    $("#input-image").val("");
    $("#input-title").val("");
    $("#input-body").val("");

    $.ajax("/api/addArticle", {
      type: "post",
      data: newArticle
    }).then(function(data) {
      socket.emit("new article", newArticle);
    });
  } else {
    //TODO: Give feedback to reporter that author, title, and body need to not be null.
    console.log("Need to give feedback on not fully filled out form");
  }
});

function formFilled(inputs) {
  var result = true;
  Object.values(inputs).forEach(function(value) {
    if (value === "" || value === null) {
      result = false;
    }
  });
  return result;
}
