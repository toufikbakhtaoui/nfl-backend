const rankingModel = require('./ranking')

const initRankings = async () => {
    const rankings = await rankingModel.find()
    if (rankings && rankings.length >= 32) {
        return
    }
    let rankingsList = []
    let ranking = null
    for (let index = 1; index < 33; index++) {
        ranking = new rankingModel({
            season: 0,
            team: index,
            ranking: index,
        })
        rankingsList.push(ranking)
    }
    await rankingModel.insertMany(rankingsList)
}

module.exports = initRankings
