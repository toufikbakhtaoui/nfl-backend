const part_one = require('../../data/part-one.json')
const part_two = require('../../data/part-two.json')
const part_three = require('../../data/part-three.json')
const gameModel = require('../api/games/game')
const teamModel = require('../api/teams/team')

let allGames = []
const object_to_map = object => {
    const map = new Map()
    Object.keys(object).forEach(key => {
        map.set(key, object[key])
    })
    return map
}

const generate_head_to_head = (
    first_division,
    second_division,
    week,
    season
) => {
    const teams_in_first_division = []
    const team_per_division = 4
    for (let index = 1; index < 5; index++) {
        teams_in_first_division.push(
            (first_division - 1) * team_per_division + index
        )
    }

    const teams_in_second_division = []
    for (let index = 1; index < 5; index++) {
        teams_in_second_division.push(
            (second_division - 1) * team_per_division + index
        )
    }

    for (let index = 0; index < 4; index++) {
        let game = new gameModel({
            season: season,
            week: week,
            homeTeam: teams_in_first_division[index],
            awayTeam: teams_in_second_division[index],
        })
        allGames.push(game)
    }
}

const generate_in_conference_division_matchup_games = (
    first_division,
    second_division,
    week,
    season
) => {
    const team_per_division = 4
    const teams_in_first_division = []
    for (let index = 1; index < 5; index++) {
        teams_in_first_division.push(
            (first_division - 1) * team_per_division + index
        )
    }

    const teams_in_second_division = []
    for (let index = 1; index < 5; index++) {
        teams_in_second_division.push(
            (second_division - 1) * team_per_division + index
        )
    }

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_first_division[0],
        awayTeam: teams_in_second_division[0],
    })
    allGames.push(game)

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_first_division[2],
        awayTeam: teams_in_second_division[2],
    })
    allGames.push(game)

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_first_division[1],
        awayTeam: teams_in_second_division[1],
    })
    allGames.push(game)

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_first_division[3],
        awayTeam: teams_in_second_division[3],
    })
    allGames.push(game)

    week++

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_second_division[1],
        awayTeam: teams_in_first_division[0],
    })
    allGames.push(game)

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_second_division[0],
        awayTeam: teams_in_first_division[1],
    })
    allGames.push(game)

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_second_division[3],
        awayTeam: teams_in_first_division[2],
    })
    allGames.push(game)

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_second_division[2],
        awayTeam: teams_in_first_division[3],
    })
    allGames.push(game)

    week++

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_first_division[0],
        awayTeam: teams_in_second_division[2],
    })
    allGames.push(game)

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_first_division[1],
        awayTeam: teams_in_second_division[3],
    })
    allGames.push(game)

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_first_division[2],
        awayTeam: teams_in_second_division[0],
    })
    allGames.push(game)

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_first_division[3],
        awayTeam: teams_in_second_division[1],
    })
    allGames.push(game)

    week++

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_second_division[2],
        awayTeam: teams_in_first_division[1],
    })
    allGames.push(game)

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_second_division[3],
        awayTeam: teams_in_first_division[0],
    })
    allGames.push(game)

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_second_division[1],
        awayTeam: teams_in_first_division[2],
    })
    allGames.push(game)

    game = gameModel({
        season: season,
        week: week,
        homeTeam: teams_in_second_division[0],
        awayTeam: teams_in_first_division[3],
    })
    allGames.push(game)
}

const generate_same_position = (part, week, season) => {
    const schedule = object_to_map(part_one).get(part)
    for (const matchup of schedule) {
        let first_division = parseInt(matchup[0])
        let second_division = parseInt(matchup[1])
        generate_head_to_head(first_division, second_division, week, season)
    }
}

const generate_same_position_week = season => {
    const week_twelve = 12
    const week_thirteen = 13
    const season_iteration = 3
    const part_a = (season + 1) % season_iteration
    const part_b = (season + 2) % season_iteration
    generate_same_position(part_a + '', week_twelve, season)
    generate_same_position(part_b + '', week_thirteen, season)
}

const generate_in_same_division = season => {
    const team_per_division = 4
    for (let division = 1; division < 9; division++) {
        const team_position = (division - 1) * team_per_division
        const schedule = object_to_map(part_three)
        for (const [key, value] of schedule.entries()) {
            for (const game of value) {
                let homeTeam = parseInt(game[0]) + team_position
                let awayTeam = parseInt(game[1]) + team_position
                let matchup = gameModel({
                    season: season,
                    week: key,
                    homeTeam: homeTeam,
                    awayTeam: awayTeam,
                })
                allGames.push(matchup)
            }
        }
    }
}

const generate_over_conference = season => {
    const other_division_to_play = 4
    part = (season % other_division_to_play) + ''
    const schedule = object_to_map(part_two).get(part)
    for (const matchup of schedule) {
        let first_division = parseInt(matchup[0])
        let second_division = parseInt(matchup[1])
        generate_in_conference_division_matchup_games(
            first_division,
            second_division,
            8,
            season
        )
    }
}

const generate_in_conference = season => {
    const other_division_to_play = 3
    part = (season % other_division_to_play) + ''
    const schedule = object_to_map(part_one).get(part)
    for (const matchup of schedule) {
        let first_division = parseInt(matchup[0])
        let second_division = parseInt(matchup[1])
        generate_in_conference_division_matchup_games(
            first_division,
            second_division,
            4,
            season
        )
    }
}

const generate_season = async season => {
    await gameModel.deleteMany({ season: season })
    console.log('deleting all games for season', season)
    generate_same_position_week(season)
    generate_in_same_division(season)
    generate_over_conference(season)
    generate_in_conference(season)
    const teams = await teamModel
        .find({ 'standings.season': season })
        .sort('standings.rank')
    allGames.forEach(game => {
        game.homeTeamIdentifier = teams[game.homeTeam - 1].team
        game.homeTeamName = teams[game.homeTeam - 1].name
        game.awayTeamIdentifier = teams[game.awayTeam - 1].team
        game.awayTeamName = teams[game.awayTeam - 1].name
    })
    await gameModel.insertMany(allGames)
}

module.exports = generate_season
