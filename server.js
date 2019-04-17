require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var moment = require("moment");

var db = require("./models");

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
require("./routes/htmlRoutes")(app);

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
var serverClock = null;
var isPaused = true;
timerInterval = setInterval(function() {
  if (!isPaused) {
    serverClock.subtract(1, "second");
  }
}, 1000);

//Socket server logic will go here.
io.on("connection", socket => {
  io.emit("clock value", serverClock);
  //terror update
  socket.on("terror update", terrorVal => {
    io.emit("terror update", terrorVal);
  });

  //global modal post
  socket.on("global modal post", data => {
    io.emit("global modal post", data);
  });

  //global mod changes
  socket.on("global effect submit", data => {
    io.emit("global effect submit", data);
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
  //TODO: write clientside and admin hide logic

  //**The following sockets listen for timer start/stop/change calls**//
  socket.on("stop timer", timerVal => {
    timerVal = moment().format(timerVal, "mm:ss");
    io.emit("stop timer", timerVal);
    isPaused = true;
    console.log("timer stopped");
  });
  socket.on("start timer", timerVal => {
    timerVal = moment().format(timerVal, "mm:ss");
    if (serverClock) {
      timerVal = moment().format(serverClock, "mm:ss");
    } else {
      serverClock = timerVal;
    }
    io.emit("start timer", timerVal);
    isPaused = false;
    console.log("timer started");
  });
  //TODO: the functionality to enter a new timer change still needs to be written.
  socket.on("change timer", newTimerVal => {
    timer = moment().format(newTimerVal, "mm:ss");
    io.emit("change timer", newTimerVal);
    console.log("timer changed");
  });
});

module.exports = app;
