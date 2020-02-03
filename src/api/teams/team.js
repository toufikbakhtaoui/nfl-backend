const mongoose = require('mongoose')

const standingSchema = new mongoose.Schema({
    season: {
        type: Number,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
    win: {
        type: Number,
    },
    lost: {
        type: Number,
    },
    draw: {
        type: Number,
    },
    scored: {
        type: Number,
    },
    conceded: {
        type: Number,
    },
})

const teamSchema = new mongoose.Schema(
    {
        team: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        city: String,
        stadium: String,
        conference: {
            type: String,
            enum: ['AFC', 'NFC'],
            required: true,
        },
        division: {
            type: String,
            enum: ['NORTH', 'SOUTH', 'EAST', 'WEST'],
            required: true,
        },
        standings: [standingSchema],
    },
    { timestamps: true }
)

module.exports = mongoose.model('Team', teamSchema)
