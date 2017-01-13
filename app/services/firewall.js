/**
 * Created by rdantzer on 18/06/16.
 */

var jwt = require('jwt-simple'),
    config = require('../config/database'),
    User = require('../models/user');

exports.isAuthentified = function (req, res, next) {
    if (!req.headers.token)
        res.rest(false, {message: 'Please provide a token'}, 401);
    else {
        req.decoded = jwt.decode(req.headers.token, config.secret);
        User.findOne({username: req.decoded.username}, function (err, user) {
            if (err)
                return res.rest(false, {message: 'Invalid token'}, 401);
            if (!user) {
                return res.rest(false, {message: 'Invalid token'}, 403);
            } else {
                next();
            }
        });
    }
};