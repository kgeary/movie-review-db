module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 900]
      }
    },
    score: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
  });
  Review.associate = function (models) {
    models.Review.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Review.belongsTo(models.Movie, {
      onDelete: "RESTRICT",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Review;
};





