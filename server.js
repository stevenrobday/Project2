require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var exphbs = require("express-handlebars");
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var uuid = require('uuidv4');

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(cookieParser());

var myStore = new SequelizeStore({
  db: db.sequelize,
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 24 * 60 * 60 * 1000
})

app.use(session({
  cookie: {
    path    : '/',
    maxAge  : 24*60*60*1000
  },
  genid: function(req) {
    return uuid().replace(/-/g, ""); // use UUIDs for session IDs
  },
  secret: 'bill bob',
  store: myStore,
  saveUninitialized: false,
  resave: false
}));

// app.use(function(req, res, next){
//   res.locals.currentUser = req.session.userId;
//   next();
// });

myStore.sync();

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/comments-api-routes")(app);
require("./routes/favorites-api-routes")(app);
require("./routes/user-api-routes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
