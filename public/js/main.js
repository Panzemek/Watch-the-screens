//This file modularizes all the client side JS files while only requiring one.
$.getScript("/js/reporter.js");
$.getScript("/js/admin.js");
$.getScript("/js/overview.js");
$.getScript("/js/clock.js");

var socket = io();

$("#gameStart").on("click", () => {
  socket.emit("game start");
});
