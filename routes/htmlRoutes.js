var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.game
      .findAll({
        attributes: ["id", "game_description"]
      })
      .then(function(gameSummary) {
        res.render("index", { games: gameSummary });
      });
  });

  app.get("/:gameId/overview", function(req, res) {
    db.game
      .findAll({
        attributes: ["id", "terror", "rioters"],
        where: {
          id: req.params.gameId
        },
        include: [db.global_effect]
      })
      .then(function(overResult) {
        res.render("overview", overResult);
      });
  });

  app.get("/:gameId", function(req, res) {
    db.game
      .findAll({
        attributes: ["terror", "rioters", "current_round"],
        where: {
          id: req.params.gameId
        }
      })
      .then(function(overviewData) {
        res.json(overviewData);
      });
  });

  //this route should be the inital game setup route
  app.get("/admin", function(req, res) {
    res.render("gameCreate"); //admin page
  });

  //this is the admin 'control' interface
  app.get("/:gameId/admin", function(req, res) {
    var allAdminJson = {};
    db.article
      .findAll({
        attributes: ["title", "id", "is_hidden"],
        where: {
          gameId: req.params.gameId
        }
      })
      .then(function(articleResult) {
        allAdminJson.articles = articleResult;
        db.global_effect
          .findAll({
            where: {
              gameId: req.params.gameId
            }
          })
          .then(function(eventResult) {
            allAdminJson.global_events = eventResult;
            db.game
              .findAll({
                attributes: [
                  "id",
                  "current_round",
                  "terror",
                  "rioters",
                  "is_paused",
                  "round_duration"
                ],
                where: {
                  id: req.params.gameId
                }
              })
              .then(function(gameResult) {
                allAdminJson.game_params = gameResult[0];
                res.render("admin", allAdminJson);
              });
          });
      });
  });

  //reporter news publish location here
  app.get("/:gameId/news/:org", function(req, res) {
    //query for news org info here
    var org = req.params.org;

    db.network
      .findAll({
        where: {
          network_short: org
        }
      })
      .then(function(networkResult) {
        // eslint-disable-next-line camelcase
        networkResult[0].dataValues.game_id = req.params.gameId;
        res.render("reporter", networkResult[0].dataValues);
      });
  });

  app.get("/:gameId/newsViewer", function(req, res) {
    var gameId = req.params.gameId;

    db.article
      .findAll({
        where: {
          gameId: gameId
        },
        include: [db.network]
      })
      .then(function(articleResult) {
        var articleObject = {};
        for (i in articleResult) {
          if (
            Object.keys(articleObject).includes(
              articleResult[i].round_created.toString()
            )
          ) {
            articleObject[articleResult[i].round_created].articles.push(
              articleResult[i]
            );
          } else {
            articleObject[articleResult[i].round_created] = {
              articles: [articleResult[i]],
              round: articleResult[i].round_created
            };
          }
        }
        res.render("newsViewer", { rounds: articleObject });
      });
  });

  // Load example page and pass in an example by id
  app.get("/:gameId/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  //This would default all routes other than those above to the default game page - do we want this or the 404 page?
  app.get("*", function(req, res) {
    res.redirect("/");
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
