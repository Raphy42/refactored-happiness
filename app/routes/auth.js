/**
 * Created by rdantzer on 18/06/16.
 */

var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    jwt = require('jwt-simple'),
    config = require('../config/database');

router.route('/authenticate')
    .post(function (req, res) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (err)
                res.status(500).send({success: false});
            if (!user) {
                res.rest(false, {message: 'Authentication failed. User not found.'}, 400);
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.encode(user, config.secret);
                        // return the information including token as JSON
                        res.rest(true, {token: token, _id: user._id});
                    } else {
                        res.rest(false, {message: 'Authentication failed. Wrong password.'}, 400);
                    }
                });
            }
        });
    });

router.route('/register')
    .post(function (req, res) {
        if (!req.body.email || !req.body.password) {
            res.rest(false, {message: 'Please provide email and password'}, 400);
        } else {
            var newUser = new User({
                email: req.body.email,
                password: req.body.password
            });
            // save the user
            newUser.save(function (err) {
                if (err) {
                    return res.rest(false, {message: 'Username already taken'}, 400);
                }
                res.rest(true, {message: 'Successful created new user.'}, 201);
            });
        }
    });

module.exports = router;