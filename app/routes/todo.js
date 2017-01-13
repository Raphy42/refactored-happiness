/**
 * Created by rdantzer on 18/06/16.
 */

/**
 * Created by rdantzer on 18/06/16.
 */

var express = require('express'),
    router = require('./params'),
    TodoController = require('../controllers/todo');

router.use(require('../services/firewall').isAuthentified);

router.route('/users/:user_id/todos')
    .get(TodoController.getTodos);

router.route('/modules/:module_id/todos')
    .post(TodoController.addTodo)
    .get(TodoController.getTodos);

router.route('/todos/:todo_id')
    .get(TodoController.getTodo);


module.exports = router;
