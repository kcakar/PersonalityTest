module.exports = (sequelize,dataTypes)=>{
  
  let Question=sequelize.define('question', {
    dateCreated:{
      type: dataTypes.DATE
    },
    text: {
      type: dataTypes.STRING(400)
    },
    order: {
      type: dataTypes.INTEGER
    },
    personalityType: {
      type: dataTypes.INTEGER
    },
    language: {
      type: dataTypes.STRING
    },
  });

  return Question;
}