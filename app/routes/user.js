/**
 * Created by rdantzer on 18/06/16.
 */

var express = require('express'),
    router = require('./params'),
    UserController = require('../controllers/user');

router.use(require('../services/firewall').isAuthentified);

router.route('/users')
    .get(UserController.getUsers);

router.route('/users/:user_id')
    .get(function (req, res) {
        res.rest(true, req.user);
    });

module.exports = router;