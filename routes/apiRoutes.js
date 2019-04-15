var db = require("../models");

module.exports = function(app) {
  app.post("/api/createGame", function(req, res) {
    //TODO: Make a post call to the db to add a game, return the gameId and use that to redirect to /<game.id>/admin.
    console.log(req.body);
    res.redirect("/1/admin");
  });

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
