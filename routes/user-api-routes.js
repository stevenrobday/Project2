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

    app.post("/api/create", function(req, res){
        console.log(req.body);
        db.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_password: req.body.password,
            user_email: req.body.email
        });
    });

    

    




}
