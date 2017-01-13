/**
 * Created by rdantzer on 18/06/16.
 */

var mongoose = require('mongoose');

var TodoSchema = mongoose.Schema({
    _owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    task: String,
    priority: {
        type: String,
        enum: ['priority.low', 'priority.normal', 'priority.high', 'priority.extreme']
    },
    status: {
        type: String,
        enum: ['todo.not.assigned', 'todo.assigned', 'todo.late', 'todo.done']
    },
    registrationDate: Date,
    completionDate: Date
});

module.exports = mongoose.model('Todo', TodoSchema);