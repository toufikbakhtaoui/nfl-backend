const standingModel = require("../../api/standings/standing");

const initStandings = async () => {
  const standings = await standingModel.find();
  if (standings && standings.length >= 32) {
    return;
  }
  let standingsList = [];
  let standing = null;
  for (let index = 1; index < 33; index++) {
    standing = new standingModel({
      season: 1,
      team: index,
      win: 0,
      lost: 0,
      draw: 0,
      scored: 0,
      conceded: 0
    });
    standingsList.push(standing);
  }
  await standingModel.insertMany(standingsList);
};

module.exports = initStandings;
