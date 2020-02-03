const seasonModel = require('../api/seasons/season')

exports.updateSeason = async season => {
    await seasonModel.findOneAndUpdate(
        { seasonId: season },
        { $inc: { weekToPlay: 1 } }
    )
}
