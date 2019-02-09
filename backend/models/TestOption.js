module.exports = (sequelize,dataTypes)=>{
  
  let TestOption=sequelize.define('testOption', {
    language: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: ["^[a-z]+$",'i']
      }
    },
    option1: {
      type: dataTypes.STRING(50),
      allowNull: false,
      validate:{
        notEmpty: true,
      } 
    },
    option2: {
      type: dataTypes.STRING(50),
      allowNull: false,
      validate:{
        notEmpty: true,
      } 
    },
    option3: {
      type: dataTypes.STRING(50),
      allowNull: false,
      validate:{
        notEmpty: true,
      } 
    },
    option4: {
      type: dataTypes.STRING(50),
      allowNull: false,
      validate:{
        notEmpty: true,
      } 
    },
    option5: {
      type: dataTypes.STRING(50),
      allowNull: false,
      validate:{
        notEmpty: true,
      } 
    }
  });

  return TestOption;
}