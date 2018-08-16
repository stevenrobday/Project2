var db = require("../models");

module.exports = function (app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  app.get("/basic/:title/:format", function (req, res) {
    //   burger.all(function(data) {
    //     var hbsObject = {
    //       burgers: data
    //     };
    //     console.log(hbsObject);
    //     res.render("index", hbsObject);
    //   });
    //res.redirect('/api/basic/' + req.params.title + "/" + req.params.format);  
    

    getUtellyData(searchURL)
      //on response
      .then(function (utRes) {
        var length = res.results.length;

        if (length === 0) {
          $options.text("NO RESULTS FOUND FOR " + originalVal);
          return;
        }

        if (length > 3) {
          length = 3;
        }

        var resultsArray = [];

        for (var i = 0; i < length; i++) {
          var obj = {};
          obj.title = utRes.results[i].name;
          resultsArray.push(obj);
        }

        res.render("index", {
          options: resultsArray
        });
      });
  });
};
