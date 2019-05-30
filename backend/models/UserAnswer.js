module.exports = (sequelize, dataTypes) => {
  let UserAnswer = sequelize.define("userAnswer", {
    selectedOption: {
      type: dataTypes.STRING(400),
      validate: {
        notEmpty: true
      }
    }
  });

  UserAnswer.associate = function(models) {
    models.userAnswer.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.userAnswer.belongsTo(models.question);
  };
  return UserAnswer;
};
