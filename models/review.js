module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [300]
      }
    },
    score: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
      validate: {
        isDecimal
      }
    },
    title: {
      type: DataTypes.STRING
    }
  });
  Review.associate = function (models) {
    models.Review.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Review;
};





