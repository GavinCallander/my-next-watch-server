const MONGOOSE = require('mongoose');

const listSchema = new MONGOOSE.Schema({
    name: {
        type: String,
        required: [true, 'name is a required field']
    },
    movies: [{
        type: MONGOOSE.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
});

module.exports = MONGOOSE.model('List', listSchema);