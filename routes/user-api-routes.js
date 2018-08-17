var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {

        res.json(dbUser)
    });

    app.get("/api/user", function (req, res) {
        db.user.findOne({
            where: {
                id: req.body.id
            }
        }).then(function () {
            res.json(dbUser);
        });
    });

    app.post("/api/find", function (req, res) {
        console.log(req.body.email);
        db.User.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password,
                email: req.body.email
            }
        }).spread(function(user, created){
            if(created){ res.send({created: true, redirect: '/'});}
            else{ res.send({created: false});}
        });
    });

    app.post("/api/create", function (req, res) {
        console.log(req.body);
        db.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            email: req.body.email
        });
    });








}
