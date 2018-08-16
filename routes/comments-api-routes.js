var db = require("../models");

module.exports = function(app) {

    app.get("/", function(req, res){

        res.json()
    });


app.get("/api/comments", function(req, res){
    db.comments.FindAll
});


app.post("/api/comments", function(req, res){

});



}