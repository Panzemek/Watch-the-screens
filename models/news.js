module.exports = function(sequelize, DataTypes) {
  var article = sequelize.define("article", {
    id: {
      type: DataTypes.INTEGER,
      AllowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: { type: DataTypes.STRING, AllowNull: false },
    img_url: { type: DataTypes.STRING, AllowNull: true },
    author: { type: DataTypes.STRING, AllowNull: false },
    article_body: { type: DataTypes.TEXT, AllowNull: false },
    round_created: { type: DataTypes.INTEGER, AllowNull: false },
    is_hidden: { type: DataTypes.BOOLEAN, defautValue: false, AllowNull: false }
  });

  article.associate = function(models) {
    article.belongsTo(models.game);
    article.belongsTo(models.network);
  };

  return article;
};
