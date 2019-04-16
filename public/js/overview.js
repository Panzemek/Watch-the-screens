//this is the work in progress for the scroll bar event listener for the scrolling Marquee section.
//
// <html>
// <body>
//   <div class="marquee">jQuery marquee is the best marquee plugin in the world</div>
// </body>
// </html>
//
// <style>
// /* .marquee {
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
// </style>

$(".marquee").marquee({
  //speed in milliseconds of the marquee
  duration: 5000,
  //gap in pixels between the tickers
  gap: 50,
  //time in milliseconds before the marquee will start animating
  delayBeforeStart: 0,
  //'left' or 'right'
  direction: "right",
  //true or false - should the marquee be duplicated to show an effect of continues flow
  duplicated: true
});
var state = "init 2://todo:pass something here  param to setIntFxn";
//every 1k intvl call null and bind, passing current st";//pass param to setIntFxn//every 1k intvl call null and bind, passing current st.""
var oldState = state; //read pre/post:MR- .bind; .closures: https://hackernoon.com/how-to-use-javascript-closures-with-confidence-85cd1f841a6b
//using first arg Null, to be populated w/oldState,nextParam
setInterval(onInterval.bind(null, oldState, state), 1000);

function onInterval(oldState, state) {
  // if (state === oldState.state){
  //   return; //bc nothing's changed;
  // };
  //Ideally, will scroll and every sec will add word/to become: array.i;
  state = "hello";
  oldState = "gbye";
  if (oldState !== state) {
    $(".marquee").html(state);
    oldState = state;
  }
  // state = state + "add something";
  // $(".marquee").html("static:initial string goes here"); //initial str
}
//TODO: want to close over it, MUST CLOSE OUT
// timer running over it at marquis; chg txt by input array[]//
$(".marquee")
  .bind("beforeStarting", function() {
    //code you want to execute before starting the animations
  })
  .bind("finished", function() {
    //code you want to execute before after each animation loop
  });
/*question of closures: https://hackernoon.com/how-to-use-javascript-closures-with-confidence-85cd1f841a6b
Links: inventor: documentation:
http://plugins.jquery.com/marquee/
jQuery Marquee with CSS3 Support
by AamirAfridi.com
*/
