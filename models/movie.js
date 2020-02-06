module.exports = function (sequelize, DataTypes) {
  var Movie = sequelize.define("Movie", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Movie.associate = (models) => {
    models.Movie.hasMany(models.Review);
  };

  return Movie;
};
