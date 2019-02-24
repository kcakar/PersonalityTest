module.exports = (sequelize, dataTypes) => {
  let UserAnswer = sequelize.define("userAnswer", {
    selectedOption: {
      type: dataTypes.ENUM,
      values: ["-2", "-1", "0", "1", "2"],
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
