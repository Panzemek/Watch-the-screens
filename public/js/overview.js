var articles = [];
var lastUsedArticle = 1;
var carouselListener;
var socket = io();
// var pageLoaded = moment();

//TEMP BUTTON CLICK REMOVE ONCE ARTICLES ARE SETUP
$("#temp-article").click(function() {
  $.ajax("/" + $("#overview-container").data("game") + "/articles", {
    type: "get"
  }).then(function(data) {
    articles.push(...data.articles);
    checkArticleArray();
  });
});

// On page load we need to get all available articles and put them in our articles array.
$(this).ready(function() {
  $.ajax("/" + $("#overview-container").data("game") + "/articles", {
    type: "get"
  }).then(function(data) {
    console.log(data);
    var newArticles = [...data.articles];
    for (i in newArticles) {
      newArticles[i].seen = false;
      articles.push(newArticles[i]);
    }
    checkArticleArray();
  });
});

// Check the articles array length and start behavior based on it.
function checkArticleArray() {
  //One article, Advance to the one article and wait there. Remove the template carousel panel.
  if (articles.length === 1) {
    populateArticle($(".carousel-item:not(.active)"), articles[0]);
    $("#article-carousel").carousel(1);
    $("#article-carousel").one("slid.bs.carousel", function() {
      $("#carousel-1").remove();
      $("#article-carousel").carousel("pause");
    });
    //More than one article, Advance to the next article and begin cycling the articles.
  } else if (articles.length > 1) {
    populateArticle($(".carousel-item:not(.active)"), articles[0]);
    $("#article-carousel").carousel(1);
    $("#article-carousel").one("slid.bs.carousel", function() {
      $("#carousel-1").remove();
      $("#article-carousel").carousel("cycle");
    });
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

//this is the work in progress for the scroll bar event listener for the scrolling Marquee section.
//
// <html>
// <body>
//   <div class="marquee">jQuery marquee is the best marquee plugin in the world</div>
/*{ <h1>Random marquee text</h1>
<div class='marquee'>Longer text lorem ipsum dolor sit amet, consectetur adipiscing elit END.</div>

<div class='marquee1'>
Coding Bootcamp Alum Leads Org. to a $1,000,000,000 valuation
</div>


<button id="newArticleBtn">New Article</button>

<pre>Step 1: The Marquee scrolls text that is placed in it in the handlebars file (This currently works)
Step 2: Create a button on the screen and make an on click function bound to that button.
Inside the function, create a string variable. then make the marquee text change to the string variable.
Step 3: Create a function that takes in an array of strings and combines them into one string. Use that output as the marquee text.
Step 4: Make the button add an element to the array and trigger a marquee update with that change.</pre> */

// <style>
// /* /* .marquee {
//   width: 300px;
//   overflow: hidden;
//   border: 1px solid #ccc;
//   background: #ccc;
// } */

// .marquee {
//   width: 300px; /* the plugin works for responsive layouts so width is not necessary */
//   overflow: hidden;
//   border:1px solid #ccc;
// }

// body {
//     margin: 10px;
//     font-family:'Lato', sans-serif;
// }
// .marquee1 {ws
//     width: 300px;
//     overflow: hidden;
//     border:1px solid #ccc;
//     background: black;
//     color: rgb(202, 255, 195);
// }
// </style>

$(document).ready(function() {
  //*window for images();

  $(".marquee").marquee({
    //, .marquee1 removed
    duration: 6000, //speed in milliseconds of the marquee
    gap: 50, //gap in pixels between the tickers
    delayBeforeStart: 0, //time in milliseconds before the marquee will start animating
    direction: "right", //'left' or 'right'
    duplicated: true //true or false - should the marquee be duplicated to show an effect of continues flow
  });
  $(".marquee")
    .bind("finished", function() {
      $(this).marquee("before");
      console.log("Welcome"); //Change text to something else after first loop finishes
      $(this).marquee("destroy");
      // alert("finished.destroy");WORKS!
      //Load new content using Ajax and update the marquee container
      $(this)
        .html("Some new data loaded using ajax")
        //Apply marquee plugin again
        .marquee();
    })
    .showMarquee();
});

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
  console.log(data);
  $("#modalBlastText").html(data.text);
  $("#modalBlast").modal("show");
});

socket.on("global effect submit", data => {
  console.log(data);
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
  console.log("new article is: " + article);
  //TODO: what exactly does data object look like?
  articles.unshift(article);
  articles[0].seen = false;
});

socket.on("new page load", data => {
  console.log("new page recieved");
  time = moment(data.time);
  console.log(time);
  isPaused = data.pause;
});

/*question of closures: https://hackernoon.com/how-to-use-javascript-closures-with-confidence-85cd1f841a6b
Links: inventor: documentation:
http://plugins.jquery.com/marquee/
jQuery Marquee with CSS3 Support
by AamirAfridi.com
*/
