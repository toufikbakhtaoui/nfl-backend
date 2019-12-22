const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    teamId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: String,
    stadium: String,
    conference: {
        type: String,
        enum: ['AFC', 'NFC'],
        required: true
    },
    division: {
        type: String,
        enum: ['NORTH', 'SOUTH', 'EAST', 'WEST'],
        required: true
    }
}, 
{ timestamps: true }
)

module.exports = mongoose.model('Team', teamSchema)