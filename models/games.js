module.exports = function(sequelize, DataTypes) {
  var game = sequelize.define("game", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    game_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    round_duration: {
      type: DataTypes.INTEGER,
      defaultValue: 1800,
      allowNull: false
    },
    terror: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    rioters: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    current_round: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    article_decay: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      allowNull: false
    },
    is_paused: {
      type: DataTypes.BOOLEAN,
      defautValue: false,
      allowNull: false
    },
    time_remaining: { type: DataTypes.INTEGER, allowNull: true },
    is_complete: {
      type: DataTypes.BOOLEAN,
      defautValue: false,
      allowNull: false
    }
  });

  game.associate = function(models) {
    game.hasMany(models.article);
    game.hasMany(models.global_effect);
  };

  return game;
};
