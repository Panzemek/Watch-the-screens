var articles = [];
var lastUsedArticle = 1;
var carouselListener;
var socket = io();
var carouselRunning = false;
// var pageLoaded = moment();

// On page load we need to get all available articles and put them in our articles array.
$(this).ready(function() {
  $.ajax("/api/" + $("#overview-container").data("game") + "/articles", {
    type: "get"
  }).then(function(data) {
    console.log(data);
    var newArticles = data.articles.slice(0);
    var articleString = "";
    console.log(newArticles);
    for (i in newArticles) {
      console.log("here", i);
      console.log(newArticles[i]);
      newArticles[i].seen = false;
      articles.push(newArticles[i]);
      articleString +=
        " [" +
        newArticles[i].network.network_short +
        "] " +
        newArticles[i].title;
    }
    $(".marquee")
      .html(articleString)
      .marquee();
    console.log(articleString);
    checkArticleArray();
  });
});

// Check the articles array length and start behavior based on it.
function checkArticleArray() {
  console.log("article length:", articles.length);
  //One article, Advance to the one article and wait there. Remove the template carousel panel.
  if (articles.length === 1) {
    populateArticle($(".carousel-item:not(.active)"), articles[0]);
    $("#article-carousel").carousel(1);
    $("#article-carousel").one("slid.bs.carousel", function() {
      $("#carousel-1").remove();
      $("#article-carousel").carousel("pause");
      carouselRunning = false;
    });
    //More than one article, Advance to the next article and begin cycling the articles.
  } else if (articles.length > 1) {
    console.log("carousel running?", carouselRunning);
    if (!carouselRunning) {
      populateArticle($(".carousel-item:not(.active)"), articles[0]);
      $("#article-carousel").carousel(1);
      $("#article-carousel").one("slid.bs.carousel", function() {
        $("#carousel-1").remove();
        $("#article-carousel").carousel("cycle");
      });
      //Prevents multiple event listeners for the carousel from being applied.
      if (!carouselListener) {
        carouselListener = $("#article-carousel").on(
          "slid.bs.carousel",
          function() {
            populateArticle(
              $(".carousel-item:not(.active)"),
              articles[lastUsedArticle]
            );
            lastUsedArticle++;
            if (lastUsedArticle >= articles.length) {
              lastUsedArticle = 0;
            }
          }
        );
      }
      carouselRunning = true;
    }
  }
}

// Takes in an article html object and an article json object and populates the html with the json.
function populateArticle(html, article) {
  if (html.length > 1) {
    html = $(html[0]);
  }
  if (!article.seen) {
    html.find(".breaking-news").removeClass("hidden");
  } else {
    html.find(".breaking-news").addClass("hidden");
  }
  article.seen = true;
  html.find(".network-icon").attr("src", article.network_image);
  html.find(".network-icon").attr("alt", article.network_short);
  html.find(".network-name").text(article.network_full);
  html.find(".title").text(article.title);
  html.find(".author").text("By " + article.author);
  html.find(".image").attr("src", article.img_url);
  html.find(".article-text").text(article.article_body);
}

//**** Sockets stuff below ****/

socket.on("terror update", terrorVal => {
  console.log("Terror val is " + terrorVal);
  $("#terror").html(terrorVal.terror);
});

socket.on("riot update", riotVal => {
  console.log("Riot value is " + riotVal.rioters);
  $("#rioters").html(riotVal.rioters);
});

socket.on("global modal post", data => {
  $("#modalBlastText").html(data.text);
  $("#modalBlast").modal("show");
  window.setTimeout(function() {
    $("#modalBlast").modal("hide");
  }, data.duration * 1000 * 60);
});

socket.on("global effect redraw", data => {
  console.log("triggered global effect redraw");
  //destroy the thing
  $("#global-effects-ul").empty();
  for (i in data) {
    console.log(data[i].id);
    //draw all the things
    var listItem = $("<li>");
    listItem.addClass("global-effect");
    listItem.attr("data-id", data[i].id);
    listItem.text(data[i].effect_text);
    $("#global-effects-ul").append(listItem);
  }
});

socket.on("hide article", data => {
  for (var i = 0; i++; i < articles.length) {
    if (articles[i].id === data.id) {
      articles.splice(index, 1);
    }
  }
});

socket.on("show article", data => {
  articles.push(data);
  articles[articles.length - 1].seen = false;
});

//adds a new article to the array of articles
//one idea for this - store locally on admin and overview (with the exact same name)
//this JS exists on both pages, so it will handle both.
socket.on("new article", article => {
  //TODO: what exactly does data object look like?
  console.log("article Pushed to array");
  articles.unshift(article);
  articles[0].seen = false;
  checkArticleArray();
});

socket.on("new page load", data => {
  console.log("new page recieved");
  time = moment(data.time);
  console.log(time);
  isPaused = data.pause;
});
