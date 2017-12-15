//A Game has many Teams and a Team has many Users and a User has many Teams
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  });

  Game.associate = function(models) {
    // Associating User with Games
    // When an User is deleted, also delete any associated Games
    Game.hasMany(models.teams, {
      onDelete: "cascade"
    });
  };
  return Game;
};