var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("main")
  });

  //this route should be the inital game setup route
  app.get("/WTS/admin"), (req, res) => {
    var gameId = req.params.gameId
    //database call
    res.render //admin page
  }
  //this is the admin 'control' interface
  app.get("/WTS/:gameId/admin"), (req, res) => {
    var gameId = req.params.gameId
    //database call for current values
    res.render //admin page
  }

  //reporter news publish location here
  app.get("/WTS/:gameId/news/:org"), (req, res) => {
    //query for news org info here
    var newsOrg = req.params.org
    var gameId = req.params.gameId
    res.render("reporter") //handlebars news org here
  }

  app.get("/WTS/:gameId/newsViewer"), (req, res) => {
      var gameId = req.params.gameId
      res.render("newsViewer")
  }


  // Load example page and pass in an example by id
  app.get("/WTS/:gameId/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  //This would default all routes other than those above to the default game page - do we want this or the 404 page?
  app.get('*',function (req, res) {
    res.redirect('/');
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
