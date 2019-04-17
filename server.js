require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;
//sockets stuff
var http = require('http').Server(app);
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

//Socket server logic will go here.

io.on("connection", (socket) => {
  console.log("a user connected")
  //terror update
  socket.on("terror update", (terrorVal) => {
    io.emit("terror update", terrorVal);
  });
  
  //global modal post
  socket.on("global modal post", (data) => {
    io.emit("global modal post", data);
  });

  //global mod changes

  //game end - what do we need to pass into callback? game end route?
  socket.on("game ended", (placeholder) => {
    io.broadcast.emit("game ended", (placeholder));
  });
  //TODO:clientside logic
  
  //new news article

  //hide news article

  //
});

module.exports = app;
