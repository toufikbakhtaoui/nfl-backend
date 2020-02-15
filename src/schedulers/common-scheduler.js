exports.getWinners = games => {
    const winners = []
    games.forEach(game => {
        const winner =
            game.homeTeamScore - game.awayTeamScore > 0
                ? game.homeTeamIdentifier
                : game.awayTeamIdentifier
        winners.push(winner)
    })
    return winners
}
