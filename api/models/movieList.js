const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true
    },
    movieGenre: {
        type: String,
        required: true
    },
    movieRating: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }, 
})

module.exports = mongoose.model('movieList', movieSchema);