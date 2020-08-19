const MONGOOSE = require('mongoose');

const movieSchema = new MONGOOSE.Schema({
    title: {
        type: String,
        required: [true, 'title is a required field']
    },
    poster: {
        type: String,
        required: [true, 'poster is a required field']
    },
    release_year: {
        type: String,
        required: [true, 'release_year is a required field']
    },
    rating: {
        type: Number
    },
    tmdb_rating: {
        type: Number,
        required: [true, 'tmdb_rating is a required field']
    }
});

module.exports = MONGOOSE.model('Movie', movieSchema);