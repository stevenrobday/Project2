var db = require("../models");

module.exports = function(app) {

    app.get("/", function(req, res){

        res.json(dbUser)
    });

    app.get("/api/user", function(req, res){
        db.user.findOne({
            where: {
                id:req.body.id
            }
        }).then(function(){
            res.json(dbUser);
        });
    });

    app.post("/api/user", function(req, res){
        console.log(req.body);
        db.user.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        }).then(function(){
            res.json();
        });
    });

    

    




}
