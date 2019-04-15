var db = require("../models");

module.exports = function(app) {
  //Used by the admin createGame view
  app.post("/api/createGame", function(req, res) {
    //TODO: Make a post call to the db to add a game, return the gameId and use that to redirect to /<game.id>/admin.
    console.log(req.body);
    res.redirect("/1/admin");
  });

  //Used by the admin view. Updates the terror level.
  app.put("/api/updateTerror", function(req, res) {
    //TODO: make a put call to the db to update the terror level
    console.log(req.body);
    //TODO: if the response is good, send update to overview views with updated terror level.
  });

  //Used by the admin view. Sends a message to all overview screens the pops a modal with a global message for the specified duration.
  app.post("/api/postGlobal", function(req, res) {
    //TODO: push this data to the overview screen (which should trigger the modal to pop).
    console.log(req.body);
  });
};
