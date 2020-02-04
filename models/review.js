module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      // Shoud I use type: DataTypes.TEXT instead? 
      allowNull: false,
      validate: {
        len: [300]
      }
     }
  });

    
  return Review;
};