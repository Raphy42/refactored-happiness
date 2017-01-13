/**
 * Created by rdantzer on 22/06/16.
 */

var Module = require('../models/module'),
    Project = require('../models/project');

exports.getModules = function (req, res) {
    if (!req.project)
        res.rest(false, {message: 'Unknown project'}, 404);
    else {
    }
};

exports.getModule = function (req, res, next, module_id) {
    if (req.module)
        res.rest(true, req.module);
    else {
        Module.findOne({_id: module_id}, function (err, module) {
            if (err || !module)
                res.rest(false, {message: 'No such module'}, 404);
            else {
                req.module = module;
                next();
            }
        })
    }
};

exports.createModule = function (req, res) {
    if (!req.project)
        res.rest(false, {message: 'Unknown project'}, 404);
    else {
        var module = new Module({
            name: req.body.name,
            description: req.body.description,
            contributors: req.body.contributors,
            todos: []
        });

        module.save(function (err, module) {
            if (err)
                res.rest(false, {message: 'Module json is invalid'}, 400);
            else {
                Project.findOne({_id: req.project._id}, function (err, project) {
                    if (err)
                        res.rest(false, {message: 'Unable to add module to project'}, 500);
                    else {
                        project.modules.push(module);
                        project.save(function (err) {
                            if (err)
                                res.rest(false, {message: 'Unable to add module to project'}, 500);
                        });
                    }
                });
                res.rest(true, module);
            }
        });
    }
};