/**
 * Created by rdantzer on 18/06/16.
 */

var Todo = require('../models/todo'),
    Module = require('../models/module');

exports.getTodo = function (req, res, next, todo_id) {
    if (req.todo)
        res.rest(true, req.todo);
    else {
        Todo.findOne({_id: todo_id}, function (err, todo) {
            if (err || !todo)
                res.rest(false, {message: 'No such todo'});
            else {
                req.todo = todo;
                next();
            }
        })
    }
};

exports.getTodos = function (req, res) {
    if (req.user)
        Todo.find({_owner_id: req.user._id}, function (err, todos) {
            if (err || !todos.length)
                res.rest(false, {message: 'No todos'}, 404);
            else
                res.rest(true, todos);
        });
    else if (req.module)
        Module.findOne({_id: req.module._id}).populate('todos').exec(function (err, module) {
            if (err || !module.todos)
                res.rest(false, {message: 'Module has no todos'});
            else
                res.rest(true, module.todos);
        });
    else
        res.rest(false, {message: 'No owner specified'}, 400);
};

exports.addTodo = function (req, res) {
    var todo = new Todo({
        _ownerId: req.decoded._id,
        collaborators: req.decoded.collaborators,
        task: req.body.task,
        priority: req.body.priority,
        status: req.body.status,
        registrationDate: null,
        completionDate: null
    });

    todo.save(function (err, todo) {
        if (err)
            res.rest(false, {message: 'Bad todo json'}, 400);
        else {
            Module.findOne({_id: req.module._id}, function (err, module) {
                if (err)
                    res.rest(false, {message: 'Fatal'}, 500);
                else {
                    module.todos.push(todo);
                    module.save(function (err) {
                        if (err)
                            res.rest(false, {message: 'Unable to add todo to module'}, 500);
                        else
                            res.rest(true, todo);
                    });
                }
            });
        }
    });
};