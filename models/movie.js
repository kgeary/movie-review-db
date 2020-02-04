module.exports = function(sequelize, DataTypes) {
    var Movie = sequelize.define("Movie", {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {
        type: DataTypes.DECIMAL
       }
    });
  
      
    return Movie;
  };
  