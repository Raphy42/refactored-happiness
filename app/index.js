/**
 * Created by rdantzer on 18/06/16.
 */

module.exports = function (app) {
    express = require('express');

    app.use(function (req, res, next) {
        res.rest = function (success, data, status) {
            res.status(status || 200).json({success: success, payload: data});
        };
        next();
    });

    app.use('/api', require('./routes/auth'));
    app.use('/api', require('./routes/user'));
    app.use('/api', require('./routes/project'));
    app.use('/api', require('./routes/todo'));
    app.use('/api', require('./routes/module'));
};