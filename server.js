require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var moment = require("moment");

var db = require("./models");

var serverClock = null;
var isPaused = true;


var app = express();
var PORT = process.env.PORT || 3000;
//sockets stuff
var http = require("http").Server(app);
var io = require("socket.io")(http);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app,isPaused, io);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  http.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

//server countdown timer here
//TODO: this will need to work on round start

timerInterval = setInterval(function() {
  if (!isPaused) {
    serverClock = moment(serverClock).subtract(1, "second");
  }
}, 1000);

//Socket server logic will go here.
io.on("connection", socket => {
  //terror update
  socket.on("terror update", terrorVal => {
    console.log("terror upd makes to server");
    io.emit("terror update", terrorVal);
  });

  socket.on("riot update", riotVal => {
    console.log("riot update makes it to server");
    io.emit("riot update", riotVal);
  });

  if (serverClock) {
    socket.on("new page", () => {
      console.log("new page is firing");
      data = { time: serverClock, pause: isPaused };
      io.emit("new page load", data);
    });
  }

  //global modal post
  socket.on("global modal post", data => {
    io.emit("global modal post", data);
  });

  //global mod changes
  socket.on("global effect change", data => {
    io.emit("global effect change", data);
  });

  //game end - what do we need to pass into callback? game end route?
  socket.on("game ended", placeholder => {
    io.emit("game ended", placeholder);
  });
  //TODO:clientside logic

  //new news article
  socket.on("new article", article => {
    io.emit("new article", article);
  });
  //TODO:clientside and admin client logic;

  //hide news article
  socket.on("hide article", data => {
    io.emit("hide article", data);
  });

  //**The following sockets listen for timer start/stop/change calls**//
  socket.on("stop timer", (timerVal) => {
    //timer val above isnt needed, but if I remove it things break, so... ¯\_(ツ)_/¯
    //timerVal = moment().format(timerVal, "mm:ss");
    io.emit("stop timer", serverClock);
    isPaused = true;
    console.log("timer stopped");
  });
  socket.on("start timer", timerVal => {
    //timerVal = moment().format(timerVal, "mm:ss");
    if (!serverClock) {
      serverClock = moment().format(timerVal, "mm:ss");
    }
    io.emit("start timer", serverClock);
    isPaused = false;
    console.log("timer started");
  });
  socket.on("change timer", newTimerVal => {
    //following line of code might need some fiddling
    serverClock = moment().format(newTimerVal, "mm:ss");
    io.emit("change timer", newTimerVal);
    console.log("timer changed");
  });
});

module.exports = app;
