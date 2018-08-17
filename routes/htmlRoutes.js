var db = require("../models");
var cookieParser = require('cookie-parser');

var content = '<a class="dropdown-trigger" coverTrigger="false" href="#" data-target="dropdown1">Log In</a> or <a href="create">Sign Up</a>';
module.exports = function (app) {
  app.get("/", function (req, res) {
    var cookie = cookieParser.signedCookies(req.cookies, 'bill bob');
    if (cookie['connect.sid']) {
      db.Session.findOne({
        where: {
          sid: cookie['connect.sid']
        }
      }).then(function (data) {
        if(data){
          var resArray = data.dataValues.data.split(",");
          var userId = resArray[4].replace(/"userId":/, "");
          userId = userId.replace(/}/, "");
          db.User.findOne({
            where: {
              id: userId
            }
          }).then(function (data2){
            res.render("index", { content: "Welcome, " + data2.dataValues.first_name });
          });
        }
        else{
          res.render("index", { content: content });
        }
      });
    }
    else{
      res.render("index", { content: content });
    }
  });

  app.get("/create", function (req, res) {
    res.render("create");
  });
};
