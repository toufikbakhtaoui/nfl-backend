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
        teams.push(team)
    })
    await teamModel.insertMany(teams)
}

module.exports = initTeams
