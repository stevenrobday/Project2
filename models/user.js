module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_email: DataTypes.STRING
  });

  User.associate = function(models) {
      User.hasMany(models.Favorite, {
          foreignKey: {
              allowNull: false
          }
      
      });
  };
  
return User;
};