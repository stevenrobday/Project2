var db = require("../models");

module.exports = function(app) {


app.get("/api/favorites", function(req, res){
    db.Favorites.findAll({
        include: [db.Login]
    })

});

app.post("/api/favorites", function(req, res){

});

app.put("/api/favorites", function(req, res){

});

app.delete("/api/favorites", function(req, res){

});

}