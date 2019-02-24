module.exports = (sequelize,dataTypes)=>{
  
  let Question=sequelize.define('question', {
    text: {
      type: dataTypes.STRING(400),
      allowNull: false,
      validate:{
        notEmpty: true,
      } 
    },
    personalityType: {
      type: dataTypes.ENUM,
      allowNull: false,
      values: ["1","2","3","4","5","6","7","8","9"],
      validate:{
        notEmpty: true,
      } 
    },
    wingType:{
      type: dataTypes.ENUM,
      values: ["1","2","3","4","5","6","7","8","9"]
    },
    altType:{
      type: dataTypes.ENUM,
      values: ["SP","SX","SOC"]
    },
    language: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: ["^[a-z]+$",'i']
      }
    },
    stage:{
        type: dataTypes.ENUM,
        values: ["intro","1","2-1","2-2","2-3","3","4-1","4-2","finished"],
        defaultValue: "1"
    },
    order: {
      type: dataTypes.INTEGER,
      allowNull: false,
      isNumeric: true
    }
  });

  return Question;
}