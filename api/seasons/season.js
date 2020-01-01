const mongoose = require('mongoose')

const seasonSchema = new mongoose.Schema(
    {
        seasonId: {
            type: Number,
            required: true,
        },
        weekToPlay: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Season', seasonSchema)
