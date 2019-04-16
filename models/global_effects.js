module.exports = function(sequelize, DataTypes) {
  var global_effect = sequelize.define("global_effect", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    effect_text: { type: DataTypes.STRING, allowNull: false },
    round_created: { type: DataTypes.INTEGER, allowNull: false },
    start_trigger_type: { type: DataTypes.STRING, allowNull: true },
    start_trigger_value: { type: DataTypes.STRING, allowNull: true },
    end_trigger_type: { type: DataTypes.STRING, allowNull: true },
    end_trigger_value: { type: DataTypes.STRING, allowNull: true },
    is_hidden: { type: DataTypes.BOOLEAN, defautValue: false, allowNull: false }
  });

  global_effect.associate = function(models) {
    global_effect.belongsTo(models.game);
  };

  return global_effect;
};
