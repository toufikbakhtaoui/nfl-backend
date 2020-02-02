const getScore = () => {
    const min = 3
    const max = 45
    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = { getScore }
