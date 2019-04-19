require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
var db = require("./models");

var serverClock = null;
var isPaused = true;
var defaultRoundLen = moment("01:00", "mm:ss");
var round = 0;
var roundEnded = false;

var app = express();
var PORT = process.env.PORT || 3000;
//sockets stuff
var http = require("http").Server(app);
var io = require("socket.io")(http);
var events = require("events");
var serverEmitter = new events.EventEmitter();

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
require("./routes/htmlRoutes")(app, isPaused, io);

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
  //check round end logic goes here//
  if (!isPaused) {
    if (
      moment(serverClock).isSame(moment("2019-04-19T00:00:00.000"), "second")
    ) {
      roundEnded = true;
      roundEnd();
      serverEmitter.emit("round ended", { time: serverClock, round: round });
      console.log("emitted round end")
    }
    //toggle the following line to see server clock
    //console.log(serverClock.format("mm:ss"));
    serverClock = moment(serverClock).subtract(1, "second");
  }
}, 1000);

function roundEnd() {
  round++;
  serverClock = moment(defaultRoundLen, "mm:ss");
  db.game
    .findAll({
      attributes: ["current_round"],
      where: { id: 1 }
    })
    .then(function(gameRound) {
      var currentRound = gameRound[0].current_round;
      var roundIncrement = 1;
      round = currentRound + roundIncrement;
      db.game.update(
        {
          current_round: currentRound + roundIncrement
        },
        { where: { id: 1 } }
      );
    });
  roundEnded = false;
}

//Socket server logic will go here.
io.on("connection", socket => {
  socket.on("game start", () => {
    console.log("game start clock time is " + serverClock);
    var timeNew = moment("00:05", "mm:ss");
    serverClock = moment(timeNew, "mm:ss");
  });
  //round end last try
  serverEmitter.on("round ended", data => {
    console.log("round ended");
    data.time = moment(data.time, "mm:ss");
    socket.emit("new round", data);
  });
  //terror update
  socket.on("terror update", terrorVal => {
    io.emit("terror update", terrorVal);
  });
  //initializes server clock
  socket.on("server time init", time => {
    if (!serverClock) {
      time = moment(time).format("mm:ss");
      serverClock = moment(time, "mm:ss");
      console.log("server time intialized to " + serverClock.format("mm:ss"));
    }
  });
  //default round value changer
  socket.on("def round changed", newDef => {
    newDef = parseInt(newDef);
    defServerNew = moment.duration(newDef, "minutes").format();
    defaultRoundLen = moment(defServerNew, "mm:ss");
    console.log("default round len changed to : " + defaultRoundLen.format("mm:ss"));
  });
  //updates the riot value
  socket.on("riot update", riotVal => {
    console.log("riot update makes it to server");
    io.emit("riot update", riotVal);
  });

  if (serverClock) {
    socket.on("new page", () => {
      data = { time: serverClock, pause: isPaused , round: round };
      io.emit("new page load", data);
    });
  }

  //global modal post
  socket.on("global modal post", data => {
    io.emit("global modal post", data);
  });

  //global mod redraw triggers/call
  socket.on("global effect submit", data => {
    socket.emit("global effect redraw", data);
  });

  //game end - what do we need to pass into callback? game end route?
  socket.on("game ended", () => {
    io.emit("game ended");
  });

  //new news article
  socket.on("new article", article => {
    io.emit("new article", article);
    console.log("article posted");
  });

  //hide news article
  socket.on("hide article", data => {
    io.emit("hide article", data);
  });

  //**The following sockets listen for timer start/stop/change calls**//
  socket.on("stop timer", timerVal => {
    //timer val above isnt needed, but if I remove it things break, so... ¯\_(ツ)_/¯
    io.emit("stop timer", serverClock);
    isPaused = true;
    console.log("timer stopped");
  });
  socket.on("start timer", timerVal => {
    if (!serverClock) {
      serverClock = moment(timerVal, "mm:ss");
    }
    io.emit("start timer", serverClock);
    isPaused = false;
    console.log("timer started");
  });

  socket.on("change timer", newTimerVal => {
    if (serverClock) {
      newTimerVal = parseInt(newTimerVal);
      serverClockNew = moment.duration(newTimerVal, "minutes").format();
      serverClock = moment(serverClockNew, "mm:ss");
      io.emit("change timer", serverClockNew);
      console.log("timer changed");
    }
  });
});

module.exports = app;
