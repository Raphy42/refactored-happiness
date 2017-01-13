/**
 * Created by rdantzer on 22/06/16.
 */

var express = require('express'),
    router = require('./params'),
    ModuleController = require('../controllers/module');

router.route('/projects/:project_id/modules')
    .get(ModuleController.getModules)
    .post(ModuleController.createModule);

router.route('/modules/:module_id')
    .get(ModuleController.getModule);

module.exports = router;