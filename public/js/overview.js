var articles = [];
var lastUsedArticle = 1;
var carouselListener;
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
// .marquee1 {
//     width: 300px;
//     overflow: hidden;
//     border:1px solid #ccc;
//     background: black;
//     color: rgb(202, 255, 195);
// }
// </style>

$(document).ready(function(){
  $(".marquee1").text("hi");
  console.log("anythingX"); //step2b.
});

$("#newArticleBtn").click( function() { //click handler
    $(".marquee1").html("bye arrayToStringarrayToStringarrayToStringarrayToString");
 
});

function arrayToString() {
  
};
const arrToStr = function(arr) {  //aka arrayToString
  const str = arr.join(" "); //adds a space
  return str;
};
// var headlines = ["Coding Bootcamp Alum Leads Org. to a $1,000,000,000 valuation", "Live in Seattle"]

// for(var i=0, i < headlines.length; i++){
//   var div = $('<div class="marquee">').text(headlines[i]);
//   $('.headlines').append(div);
// }


$('.marquee, .marquee1').marquee({
  
  //speed in milliseconds of the marquee
  duration: 6000,
  //gap in pixels between the tickers
  gap: 50,
  //time in milliseconds before the marquee will start animating
  delayBeforeStart: 0,
  //'left' or 'right'
  direction: 'right',
  //true or false - should the marquee be duplicated to show an effect of continues flow
  duplicated: true
});
$('.marquee')
.bind('finished', function(){
  //Change text to something else after first loop finishes
  $(this).marquee('destroy');
      alert("finished.destroy");
  //Load new content using Ajax and update the marquee container
  $(this).html('Some new data loaded using ajax')
    //Apply marquee plugin again
    .marquee()
})
.marquee();
// $('.marquee').marquee()
// var state = "init 2://todo:pass something here  param to setIntFxn";
//every 1k intvl call null and bind, passing current st";//pass param to setIntFxn//every 1k intvl call null and bind, passing current st.""
var oldState = state; //read pre/post:MR- .bind; .closures: https://hackernoon.com/how-to-use-javascript-closures-with-confidence-85cd1f841a6b
//using first arg Null, to be populated w/oldState,nextParam
// setInterval(onInterval.bind(null, oldState, state),5000;

function onInterval (oldState,state){
  // if (state === oldState.state){
  //   return; //bc nothing's changed;
  // };
//Ideally, will scroll and every sec will add word/to become: array.i;
state = $('.marquee').text();
oldState = "gbye";
if(oldState != state){
  $(".marquee").html(state); 
  oldState = state;
};
// state = state + "add something";
// $(".marquee").html("static:initial string goes here"); //initial str
}

//TODO: want to close over it, MUST CLOSE OUT 
// timer running over it at marquis; chg txt by input array[]//

// $('.marquee').
//     .bind('beforeStarting', function () {
//         //code you want to execute before starting the animations
//         //simply to read from the aritcle.arrayList
//         console.log('starting')
//     })
//     .bind('finished', function () {
//         //code you want to execute before after each animation loop
//         //reset the state to be the current 'marquee' being displayed
//         console.log('finished')
//     });

/*question of closures: https://hackernoon.com/how-to-use-javascript-closures-with-confidence-85cd1f841a6b
Links: inventor: documentation:
http://plugins.jquery.com/marquee/
jQuery Marquee with CSS3 Support
by AamirAfridi.com
*/
