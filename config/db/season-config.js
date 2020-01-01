const seasonModel = require("../../api/seasons/season");

const initSeason = async () => {
  const seasons = await seasonModel.find();
  if (seasons && seasons.length > 0) {
    return;
  }
  const newSeason = new seasonModel({
    seasonId: 1,
    weekToPlay: 1
  });
  await newSeason.save();
};
module.exports = initSeason;
