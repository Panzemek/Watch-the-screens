module.exports = function(sequelize, DataTypes) {
  var game = sequelize.define("game", {
    id: {
      type: DataTypes.INTEGER,
      AllowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    round_duration: {
      type: DataTypes.INTEGER,
      defaultValue: 1800,
      AllowNull: false
    },
    terror: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      AllowNull: false
    },
    rioters: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      AllowNull: false
    },
    current_round: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      AllowNull: false
    },
    article_decay: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      AllowNull: false
    },
    is_paused: {
      type: DataTypes.BOOLEAN,
      defautValue: false,
      AllowNull: false
    },
    time_remaining: { type: DataTypes.INTEGER, AllowNull: true },
    is_complete: {
      type: DataTypes.BOOLEAN,
      defautValue: false,
      AllowNull: false
    }
  });

  game.associate = function(models) {
    game.hasMany(models.article);
    game.hasMany(models.globalEffect);
  };

  return game;
};
