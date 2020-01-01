const mongoose = require('mongoose')

const rankingSchema = new mongoose.Schema({
    season: {
        type: Number,
        required: true
    },
    team: {
        type: Number
    },
    ranking: {
        type: Number,
        required: true
    },
}, 
{ timestamps: true }
)

module.exports = mongoose.model('Ranking', rankingSchema)