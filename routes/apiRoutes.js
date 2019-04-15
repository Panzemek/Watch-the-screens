var db = require("../models");

module.exports = function(app) {
  app.post("/api/createGame", function(req, res) {
    //TODO: Make a post call to the db to add a game, return the gameId and use that to redirect to /<game.id>/admin.
    console.log(req.body);
    res.redirect("/1/admin");
  });

  app.put("/api/updateTerror", function(req, res) {
    //TODO: make a put call to the db
    console.log(req.body);
  });
};
