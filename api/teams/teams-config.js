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
        team.standings.push({
            season: 1,
            rank: element.team,
            win: 0,
            lost: 0,
            draw: 0,
            scored: 0,
            conceded: 0,
        })
        teams.push(team)
    })
    await teamModel.insertMany(teams)
}

module.exports = initTeams
