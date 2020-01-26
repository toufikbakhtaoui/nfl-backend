const teamModel = require('./team')

const initTeams = async () => {
    const teams = await teamModel.find()
    if (teams && teams.length === 32) {
        return
    }
    let team = null
    const teamList = require('../../data/teams')
    teamList.forEach(element => {
        team = new teamModel(element)
        team.rankings.push({
            season: 0,
            rank: element.team
        })
        teams.push(team)
    })
    await teamModel.insertMany(teams)
}

module.exports = initTeams
