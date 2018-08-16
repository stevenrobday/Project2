module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Login", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  User.associate = function(models) {
      User.hasMany(models.Favorite, models.Comments, {
          foreignKey: {
              allowNull: false
          }
      
      });
  };
  
return Login;
};