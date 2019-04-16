module.exports = function(sequelize, DataTypes) {
  var article = sequelize.define("article", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    img_url: { type: DataTypes.STRING, allowNull: true },
    author: { type: DataTypes.STRING, allowNull: false },
    article_body: { type: DataTypes.TEXT, allowNull: false },
    round_created: { type: DataTypes.INTEGER, allowNull: false },
    is_hidden: { type: DataTypes.BOOLEAN, defautValue: false, allowNull: false }
  });

  article.associate = function(models) {
    article.belongsTo(models.game);
    article.belongsTo(models.network);
  };

  return article;
};
