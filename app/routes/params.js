/**
 * Created by rdantzer on 22/06/16.
 */

var express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/user'),
    TodoController = require('../controllers/todo'),
    ProjectController = require('../controllers/project'),
    ModuleController = require('../controllers/module');

router.param('user_id', UserController.getUser);
router.param('todo_id', TodoController.getTodo);
router.param('project_id', ProjectController.getProject);
router.param('module_id', ModuleController.getModule);

module.exports = router;