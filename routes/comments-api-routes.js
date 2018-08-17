var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.json()
    });


    app.post("/api/comments", function (req, res) {
        db.Comment.findAll({
            raw: true,
            where: {
                title: req.body.title
            },
            include: [db.User]
        }).then(function(data2){
            res.json(data2);
        });
    });


    app.post("/api/comment", function (req, res) {
        db.Comment.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.body.user_id
        }).then(function(data2){
            res.send({comments: true});
        });
    });



}