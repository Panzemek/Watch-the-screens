var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    var data = { current_round: 1, time_left: "20:00" };
    res.render("overview", data);
  });

  //this route should be the inital game setup route
  app.get("/admin", function(req, res) {
    res.render("gameCreate"); //admin page
  });

  //this is the admin 'control' interface
  app.get("/:gameId/admin", function(req, res) {
    //TODO: Make a call to the db and return all news.title, news.id, and news.is_hidden values for each article
    //TODO: Make a call to the db and return games.current_round and round_started (I think we need this) to calculate time left.
    var fakeArticles = [
      {
        id: 1,
        title: "Cowabunga Dude!",
        is_hidden: true
      },
      {
        id: 2,
        title: "Turtles in time!",
        is_hidden: false
      }
    ];
    var fakeGlobalEffects = [
      {
        id: 1,
        event_text: "Cat attack +2",
        start_trigger_type: "round",
        start_trigger_value: 5,
        end_trigger_type: "round",
        end_trigger_value: 12,
        is_hidden: false
      },
      {
        id: 2,
        event_text: "Dog attack -5",
        start_trigger_type: "round",
        start_trigger_value: 4,
        end_trigger_type: "round",
        end_trigger_value: 11,
        is_hidden: true
      }
    ]
    var data = {
      game: req.params.gameId,
      articles: fakeArticles,
      globalEffects: fakeGlobalEffects,
      current_round: 1,
      time_left: "20:00"
    };
    //database call for current values
    res.render("admin", data); //admin page
  });

  //reporter news publish location here
  app.get("/:gameId/news/:org", function(req, res) {
    //query for news org info here
    var org = req.params.org;
    var gameId = req.params.gameId;
    //TODO: Needs to do an database call to the network table to get the network object data in order to poulate the reporter preview modal and return it to newsOrg.
    var fakeOrgData = {
      // eslint-disable-next-line camelcase
      network_full: "Watch The Skies",
      // eslint-disable-next-line camelcase
      network_short: "WTS"
    };
    var newsOrg = fakeOrgData;
    // eslint-disable-next-line camelcase
    newsOrg.game_id = gameId;
    // eslint-disable-next-line camelcase
    newsOrg.network_short = org;
    // eslint-disable-next-line camelcase
    res.render("reporter", newsOrg); //handlebars news org here
  });

  app.get("/:gameId/newsViewer", function(req, res) {
    var gameId = req.params.gameId;
    //TODO: Needs to do a database call to get all articles (with the join of network). Then we need to construct an object with the following format
    /*
      {
        rounds: [{
          round: whatever the articles are from,
          articles: [array of articleObjects from that round]
        },{
          round: whatever the articles are from,
          articles: [array of articleObjects from that round]
        }]
      }
      */
    var fakeRoundData = {
      rounds: [
        {
          round: 1,
          articles: [
            {
              network_full: "Watch The Skies",
              network_short: "WTS",
              author: "mario",
              title: "Bobcats on the loose",
              article_body:
                "There are bobcats, and they are on the loose! More at ten"
            },
            {
              network_full: "Watch The Skies",
              network_short: "WTS",
              author: "mario",
              title: "Bobcats on the loose",
              article_body:
                "There are bobcats, and they are on the loose! More at ten"
            }
          ]
        },
        {
          round: 2,
          articles: [
            {
              network_full: "Watch The Skies",
              network_short: "WTS",
              author: "mario",
              title: "Bobcats on the loose",
              article_body:
                "There are bobcats, and they are on the loose! More at ten"
            },
            {
              network_full: "Watch The Skies",
              network_short: "WTS",
              author: "mario",
              title: "Bobcats on the loose",
              article_body:
                "There are bobcats, and they are on the loose! More at ten"
            }
          ]
        }
      ]
    };
    var rounds = fakeRoundData;
    res.render("newsViewer", rounds);
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
