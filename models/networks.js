module.exports = function(sequelize, DataTypes) {
  var network = sequelize.define("network", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    network_full: { type: DataTypes.STRING, allowNull: false },
    network_short: { type: DataTypes.STRING, allowNull: false }
  });

  network.associate = function(models) {
    network.hasMany(models.article);
  };

  return network;
};
