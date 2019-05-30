require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");

var serverClock = 0;
var isPaused = true;
var defaultRoundLen = 1800;
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
let timerInterval = setInterval(function() {
  //check round end logic goes here//
  if (!isPaused) {
    if (serverClock <= 0) {
      roundEnded = true;
      roundEnd();
      serverEmitter.emit("round ended", { time: serverClock, round: round });
      console.log("emitted round end");
    }
    //toggle the following line to see server clock
    //console.log(serverClock.format("mm:ss"));
    serverClock = serverClock -= 1;
  }
}, 1000);

function roundEnd() {
  round++;
  serverClock = defaultRoundLen;
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
  console.log("socket connected...", socket.id);

  socket.on("game start", () => {
    console.log("game start clock time is " + serverClock);
    serverClock = 5;
  });
  //round end last try
  serverEmitter.on("round ended", data => {
    console.log("round ended");
    data.time = defaultRoundLen;
    socket.emit("new round", data);
  });
  //terror update
  socket.on("terror update", terrorVal => {
    io.emit("terror update", terrorVal);
  });
  //initializes server clock
  socket.on("server time init", time => {
    if (!serverClock) {
      serverClock = time;
      console.log("server time intialized to " + serverClock);
    }
  });
  //default round value changer
  socket.on("def round changed", newDefaultLen => {
    defaultRoundLen = newDefaultLen;
    console.log("default round len changed to : " + defaultRoundLen);
  });
  //updates the riot value
  socket.on("riot update", riotVal => {
    console.log("riot update makes it to server");
    io.emit("riot update", riotVal);
  });

  if (serverClock) {
    socket.on("new page", () => {
      data = { time: serverClock, pause: isPaused, round: round };
      io.emit("new page load", data);
    });
  }

  //global modal post
  socket.on("global modal post", data => {
    io.emit("global modal post", data);
  });

  //global mod redraw triggers/call
  socket.on("global effect submit", data => {
    console.log(data);
    io.emit("global effect redraw", data);
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
      serverClock = timerVal;
    }
    io.emit("start timer", serverClock);
    isPaused = false;
    console.log("timer started");
  });

  socket.on("change timer", newTimerVal => {
    if (serverClock) {
      serverClock = newTimerVal;
      io.emit("change timer", serverClock);
      console.log("timer changed");
    }
  });
});

module.exports = app;
