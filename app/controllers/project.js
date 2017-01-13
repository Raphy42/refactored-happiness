/**
 * Created by rdantzer on 21/06/16.
 */

var Project = require('../models/project');

exports.getProjects = function (req, res) {
    if (req.user) {
        Project.find({_owner_id: req.user._id}, function (err, projects) {
            if (err || !projects.length)
                res.rest(false, {message: 'You don\'t have any projects'});
            else
                res.rest(true, projects);
        })
    } else {
        Project.find({}, function (err, projects) {
            if (err || !projects)
                res.rest(false, {message: 'There isn\'t any projects'}, 204);
            else
                res.rest(true, projects);
        })
    }
};

exports.createProject = function (req, res) {
    if (!req.user)
        res.rest(false, {message: 'Unknown user'}, 400);
    else if (req.user._id !== req.decoded._id)
        res.rest(false, {message: 'You are not allowed to do that'}, 403);
    else {
        var project = new Project({
            name: req.body.name,
            _owner_id: req.user._id,
            tags: req.body.tags,
            technos: req.body.technos,
            description: req.body.description,
            modules: []
        });

        project.save(function (err, project) {
            if (err)
                console.log(req.user) || res.rest(false, {message: 'Project json is invalid'}, 400);
            else
                res.rest(true, project);
        })
    }
};

exports.getProject = function (req, res, next, project_id) {
    if (req.project)
        res.rest(true, req.project);
    else {
        Project.findOne({_id: project_id}, function (err, project) {
            if (err || !project)
                res.rest(false, {message: 'No such project'}, 404);
            else {
                req.project = project;
                next();
            }
        })
    }
};

exports.getProjectPopulated = function (req, res) {
    if (req.project) {
        Project
            .findOne({_id: req.project._id})
            .populate('_owner_id')
            .populate({
                path: 'modules',
                populate: {path: 'todos'}
            })
            .exec(function (err, project) {
                if (err || !project)
                    res.rest(false, {message: 'No such project'}, 404);
                else
                    res.rest(true, project);
            })
    } else {
        res.rest(false, {message: 'You can\'t do that'}, 400);
    }
};