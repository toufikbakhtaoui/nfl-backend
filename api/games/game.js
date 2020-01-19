const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
    {
        season: {
            type: Number,
            required: true,
        },
        week: {
            type: Number,
        },
        homeTeam: {
            type: Number,
            required: true,
        },
        awayTeam: {
            type: Number,
            required: true,
        },
        homeTeamIdentifier: {
            type: Number,
            required: false,
        },
        awayTeamIdentifier: {
            type: Number,
            required: false,
        },
        homeTeamScore: {
            type: Number,
        },
        awayTeamScore: {
            type: Number,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Game', gameSchema)
