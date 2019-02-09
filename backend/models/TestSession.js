module.exports = (sequelize,dataTypes)=>{
    let TestSession=sequelize.define('testSession', {
        startDate:{
          type:dataTypes.DATE,
          validate:{
            isDate:true
          }
        },
        currentQuestion:{
          type:dataTypes.INTEGER,
          validate:{
            notEmpty: true,
          }
        },
        stage:{
            type: dataTypes.ENUM,
            values: ["1","2","3"],
            defaultValue: "1"
        },
        stagePersonalityType:{
            type: dataTypes.ENUM,
            values: ["-1","1","2","3","4","5","6","7","8","9"],
            defaultValue: "-1"
        }
    }); 
    
    TestSession.associate = function (models) {
      models.testSession.belongsTo(models.user, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        models.testSession.belongsTo(models.question);//check
    };

    return TestSession;
  }