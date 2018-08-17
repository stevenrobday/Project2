var db = require("../models");
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');

module.exports = function (app) {
    app.get("/api/authuser", function (req, res) {
        var cookie = cookieParser.signedCookies(req.cookies, 'bill bob');
        if (cookie['connect.sid']) {
            db.Session.findOne({
                where: {
                    sid: cookie['connect.sid']
                }
            }).then(function (data) {
                if (data) {
                    var resArray = data.dataValues.data.split(",");
                    var userId = resArray[4].replace(/"userId":/, "");
                    userId = userId.replace(/}/, "");
                    db.User.findOne({
                        where: {
                            id: userId
                        }
                    }).then(function (data2) {
                        res.send({ userID: data2.id });
                    });
                }
                else {
                    res.send({ userID: false });
                }
            });
        }
        else {
            res.send({ userID: false });
        }
    });

    app.post("/api/login", function (req, res) {
        db.User.findOne({
            where: {
                email: req.body.email
            },
            attributes: ['password', 'id']
        }).then(function (data) {
            if (data !== null) {
                bcrypt.compare(req.body.password, data.password, function (err, res2) {
                    if (res2) {
                        req.session.userId = data.id;
                        res.send({ login: true, redirect: '/' });
                    }
                    else { res.send({ login: false }); }
                });
            }
            else { res.send({ login: false }); }
        });
    });

    app.post("/api/find", function (req, res) {
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
        }).spread(function (user, created) {
            if (created) { res.send({ created: true, redirect: '/' }); }
            else { res.send({ created: false }); }
        });
    });
}
