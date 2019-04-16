var db = require("../models");

module.exports = function(app) {
  //
  //
  // Overview view routes
  app.get("/1/overview", function(req, res) {
    db.game.overviewInfo({
      where: {}
    });
  });

  //
  //
  // Reporter view routes

  app.post("/api/addArticle", function(req, res) {
    console.log(req.body);
    db.article.create(req.body).then(function(data) {
      console.log(data);
      res.json(data);
    });
  });

  //
  //
  // Article view routes

  app.get("/:gameid/articles", function(req, res) {
    db.article
      .findAllArticles({
        where: {
          gameId: req.params.gameid
        }
      })
      .then(function(articles) {
        res.json(articles);
      });
  });

  //
  //
  // Admin view routes

  //Used by the admin createGame view
  app.post("/api/createGame", function(req, res) {
    //TODO: Return the gameId and use that to redirect to /<game.id>/admin.
    console.log(req.body);
    db.game.create(req.body).then(function(dbgame) {
      console.log(dbgame.id);
      res.redirect("/1/admin");
    });
  });

  //Used by the admin view. Updates the terror level.
  app.put("/api/updateTerror", function(req, res) {
    db.game
      .update({ terror: req.body.terror }, { where: { id: req.body.gameId } })
      .then(function(dbterror) {
        res.json(dbterror);
      });

    //TODO: if the response is good, send update to overview views with updated terror level.
  });

  // Rioters update put route
  app.put("/api/updateRioters", function(req, res) {
    db.game
      .update({ rioters: req.body.rioters }, { where: { id: req.body.gameId } })
      .then(function(dbRiot) {
        res.json(dbRiot);
      });

    //TODO: if the response is good, send update to overview views with updated terror level.
  });

  //Used by the admin view. Sends a message to all overview screens the pops a modal with a global message for the specified duration.
  app.post("/api/postGlobal", function(req, res) {
    //TODO: push this data to the overview screen (which should trigger the modal to pop).
    console.log(req.body);
  });
};
