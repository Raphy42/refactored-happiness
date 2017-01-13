/**
 * Created by rdantzer on 18/06/16.
 */

var mongoose = require('mongoose');

var ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: String,
    _owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    modules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module'
    }],
    technos: [String],
    description: String
});

module.exports = mongoose.model('Project', ProjectSchema);