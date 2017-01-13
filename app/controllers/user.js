/**
 * Created by rdantzer on 18/06/16.
 */

var User = require('../models/user');

exports.getUsers = function (req, res) {
    User.find({}, {password: 0}, function (err, users) {
        if (err)
            res.json({success: false, message: 'Unknown user'});
        res.json(users);
    });
};

exports.getUser = function (req, res, next, user_id) {
    if (req.user)
        res.send({success: true, user: req.user});
    else {
        User.findOne({_id: user_id}, function (err, user) {
            if (err || !user)
                res.json({success: false, message: 'User doesnt exist'});
            else {
                req.user = user;
                next();
            }
        });
    }
};