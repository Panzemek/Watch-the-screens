module.exports = function(sequelize, DataTypes) {
  var globalEffect = sequelize.define("globalEffect", {
    id: {
      type: DataTypes.INTEGER,
      AllowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    effect_text: { type: DataTypes.STRING, AllowNull: false },
    round_created: { type: DataTypes.INTEGER, AllowNull: false },
    start_trigger_type: { type: DataTypes.STRING, AllowNull: false },
    start_trigger_value: { type: DataTypes.STRING, AllowNull: false },
    end_trigger_type: { type: DataTypes.STRING, AllowNull: false },
    end_trigger_value: { type: DataTypes.STRING, AllowNull: false },
    is_hidden: { type: DataTypes.BOOLEAN, defautValue: false, AllowNull: false }
  });

  globalEffect.associate = function(models) {
    globalEffect.belongsTo(models.game);
  };

  return globalEffect;
};
