/**
 * Created by rdantzer on 21/06/16.
 */

var express = require('express'),
    router = require('../routes/params'),
    ProjectController = require('../controllers/project');

router.use(require('../services/firewall').isAuthentified);

router.route('/projects')
    .get(ProjectController.getProjects);

router.route('/projects/:project_id')
    .get(ProjectController.getProjectPopulated);

router.route('/users/:user_id/projects')
    .get(ProjectController.getProjects)
    .post(ProjectController.createProject);

module.exports = router;
