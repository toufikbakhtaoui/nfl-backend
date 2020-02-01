const boom = require('@hapi/boom')

const teamModel = require('./team')

exports.getTeams = async (req, reply) => {
    try {
        const teams = await teamModel.find()
        return teams
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getTeamsByRanks = async (req, reply) => {
    try {
        const season = Number(req.params.season)
        const teams = await teamModel.aggregate([
            { $unwind: '$standings' },
            {
                $match: {
                    'standings.season': season,
                },
            },
            {
                $group: {
                    _id: {
                        conference: '$conference',
                        division: '$division',
                    },
                    teams: {
                        $push: {
                            city: '$city',
                            name: '$name',
                            stadium: '$stadium',
                            ranking: '$standings.rank',
                            win: '$standings.win',
                            lost: '$standings.lost',
                            draw: '$standings.draw',
                            scored: '$standings.scored',
                            conceded: '$standings.conceded',
                        },
                    },
                },
            },
        ])
        return teams
    } catch (err) {
        throw boom.boomify(err)
    }
}
