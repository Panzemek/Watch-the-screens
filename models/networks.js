module.exports = function(sequelize, DataTypes) {
  var network = sequelize.define("network", {
    id: {
      type: DataTypes.INTEGER,
      AllowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    network_full: { type: DataTypes.STRING, AllowNull: false },
    network_short: { type: DataTypes.STRING, AllowNull: false }
  });

  network.associate = function(models) {
    network.hasMany(models.article);
  };

  return network;
};
