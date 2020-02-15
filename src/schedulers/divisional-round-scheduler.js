const gameModel = require('../api/games/game')
const teamModel = require('../api/teams/team')
const standingTracker = require('../trackers/standing-tracker')
const commonScheduler = require('./common-scheduler')

const wildCardWeek = 17
const divisionalWeek = 18

const saveMatchups = async (champions, wildCardWinners, season, week) => {
    const firstSeed = champions[0]
    const secondSeed = champions[1]
    const bestWildCardSeed = wildCardWinners[0]
    const worstWildCardSeed = wildCardWinners[1]
    const divisionalGames = []

    divisionalGames.push(
        new gameModel({
            season: season,
            week: week,
            homeTeam: firstSeed.ranking,
            homeTeamIdentifier: firstSeed.team,
            homeTeamName: firstSeed.name,
            awayTeam: worstWildCardSeed.ranking,
            awayTeamIdentifier: worstWildCardSeed.team,
            awayTeamName: worstWildCardSeed.name,
        })
    )

    divisionalGames.push(
        new gameModel({
            season: season,
            week: divisionalWeek,
            homeTeam: secondSeed.ranking,
            homeTeamIdentifier: secondSeed.team,
            homeTeamName: secondSeed.name,
            awayTeam: bestWildCardSeed.ranking,
            awayTeamIdentifier: bestWildCardSeed.team,
            awayTeamName: bestWildCardSeed.name,
        })
    )
    await gameModel.insertMany(divisionalGames)
}

const getChampions = async (conferenceName, season) => {
    const champions = []
    const divisionChampion = 0
    const standings = await standingTracker.getStandings(season)
    const conference = standings.filter(
        item => item._id.conference === conferenceName
    )
    conference.forEach(div => champions.push(div.teams[divisionChampion]))
    champions.sort(function(firstTeam, secondTeam) {
        return (
            secondTeam.win - firstTeam.win ||
            secondTeam.draw - firstTeam.draw ||
            secondTeam.scored - firstTeam.scored ||
            firstTeam.conceded - secondTeam.conceded
        )
    })
    return champions.slice(0, 2)
}

const getDivisionalRound = async (winners, season, conference) => {
    const wildCardWinners = winners.filter(
        team => team.conference === conference
    )
    wildCardWinners.sort(function(firstTeam, secondTeam) {
        return (
            secondTeam.standings[0].win - firstTeam.standings[0].win ||
            secondTeam.standings[0].draw - firstTeam.standings[0].draw ||
            secondTeam.standings[0].scored - firstTeam.standings[0].scored ||
            firstTeam.standings[0].conceded - secondTeam.standings[0].conceded
        )
    })
    const champions = await getChampions(conference, season)
    await saveMatchups(champions, wildCardWinners, season, divisionalWeek)
}

const getWildCardsWinners = async season => {
    const wildCardGames = await gameModel.find({
        season: season,
        week: wildCardWeek,
    })
    const winners = []
    const winnersIds = commonScheduler.getWinners(wildCardGames)
    for (const winnerId of winnersIds) {
        const team = await teamModel.findOne({
            team: winnerId,
            'standings.season': season,
        })
        winners.push(team)
    }
    return winners
}

exports.generateDivisionalRound = async season => {
    const wildCardWinners = await getWildCardsWinners(season)
    await getDivisionalRound(wildCardWinners, season, 'AFC')
    await getDivisionalRound(wildCardWinners, season, 'NFC')
}
