module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1,500]
        }
      },
      user_id: DataTypes.INTEGER    
    });

    Comment.associate = function(models){
      Comment.belongsTo(models.User, {
            foreignKey: 'user_id'
      });
    }
    return Comment;
  };