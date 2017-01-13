/**
 * Created by rdantzer on 18/06/16.
 */

var mongoose = require('mongoose');

var ModuleSchema = mongoose.Schema({
    name: String,
    description: String,
    contributors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }]
});

module.exports = mongoose.model('Module', ModuleSchema);