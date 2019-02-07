module.exports = (sequelize,dataTypes)=>{
  
  let Question=sequelize.define('question', {
    text: {
      type: dataTypes.STRING(400),
      allowNull: false,
      validate:{
        notEmpty: true,
      } 
    },
    order: {
      type: dataTypes.INTEGER,
      allowNull: false,
      isNumeric: true
    },
    personalityType: {
      type: dataTypes.ENUM,
      allowNull: false,
      values: ["1","2","3","4","5","6","7","8","9"],
      validate:{
        notEmpty: true,
      }
    },
    language: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: ["^[a-z]+$",'i']
      }
    },
  });

  return Question;
}