const mongoose = require('mongoose')

const rankingSchema = new mongoose.Schema(
    {
        season: {
            type: Number,
            required: true,
        },
        rank: {
            type: Number,
            required: true,
        },
    }
)

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
        rankings: [rankingSchema]
    },
    { timestamps: true }
)

module.exports = mongoose.model('Team', teamSchema)
