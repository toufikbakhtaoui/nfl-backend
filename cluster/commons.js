const teamModel = require('../api/teams/team')

exports.getStandings = async season => {
    return await teamModel.aggregate([
        { $unwind: '$standings' },
        {
            $match: {
                'standings.season': season,
            },
        },
        {
            $sort: {
                'standings.win': -1,
                'standings.draw': -1,
                'standings.scored': -1,
                'standings.conceded': 1,
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
                        team: '$team',
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
}
