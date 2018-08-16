module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  User.associate = function(models) {
      User.hasMany(models.Comments, {
          foreignKey: {
              allowNull: false
          }
      
      });

  };
  
return User;
};