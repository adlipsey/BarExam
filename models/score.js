
module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define("Score", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    currentPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    currentRight: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    currentTotal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    careerPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    careerRight: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    careerTotal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
    });

  return Score;
};