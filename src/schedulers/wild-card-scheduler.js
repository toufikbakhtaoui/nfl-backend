const gameModel = require('../api/games/game')
const standingTracker = require('../trackers/standing-tracker')

const getWildCardMatchups = (season, standings, conferenceName) => {
    const conference = standings.filter(
        item => item._id.conference === conferenceName
    )
    const champions = []
    const contenders = []
    let games = []
    let game = null
    const divisionChampion = 0
    const contendersStartingPosition = 1
    conference.forEach(div => champions.push(div.teams[divisionChampion]))
    conference.forEach(div =>
        Array.prototype.push.apply(
            contenders,
            div.teams.slice(contendersStartingPosition)
        )
    )
    champions.sort(function(firstTeam, secondTeam) {
        return (
            secondTeam.win - firstTeam.win ||
            secondTeam.draw - firstTeam.draw ||
            secondTeam.scored - firstTeam.scored ||
            firstTeam.conceded - secondTeam.conceded
        )
    })
    contenders.sort(function(firstTeam, secondTeam) {
        return (
            secondTeam.win - firstTeam.win ||
            secondTeam.draw - firstTeam.draw ||
            secondTeam.scored - firstTeam.scored ||
            firstTeam.conceded - secondTeam.conceded
        )
    })

    const wildCardWeek = 17
    const thirdSeed = 2
    const sixthSeed = 1
    game = gameModel({
        season: season,
        week: wildCardWeek,
        homeTeam: champions[thirdSeed].ranking,
        awayTeam: contenders[sixthSeed].ranking,
        homeTeamIdentifier: champions[thirdSeed].team,
        awayTeamIdentifier: contenders[sixthSeed].team,
        homeTeamName: champions[thirdSeed].name,
        awayTeamName: contenders[sixthSeed].name,
    })
    games.push(game)

    const fourthSeed = 3
    const fifthSeed = 0
    game = gameModel({
        season: season,
        week: wildCardWeek,
        homeTeam: champions[fourthSeed].ranking,
        awayTeam: contenders[fifthSeed].ranking,
        homeTeamIdentifier: champions[fourthSeed].team,
        awayTeamIdentifier: contenders[fifthSeed].team,
        homeTeamName: champions[fourthSeed].name,
        awayTeamName: contenders[fifthSeed].name,
    })
    games.push(game)
    return games
}

exports.generateWildCard = async season => {
    const standings = await standingTracker.getStandings(season)
    const afcMatchup = getWildCardMatchups(season, standings, 'AFC')
    const nfcMatchup = getWildCardMatchups(season, standings, 'NFC')
    const nflMatchups = []
    Array.prototype.push.apply(nflMatchups, afcMatchup)
    Array.prototype.push.apply(nflMatchups, nfcMatchup)
    await gameModel.insertMany(nflMatchups)
}
