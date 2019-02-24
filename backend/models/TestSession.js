module.exports = (sequelize,dataTypes)=>{
    let TestSession=sequelize.define('testSession', {
        startDate:{
          type:dataTypes.DATE,
          validate:{
            isDate:true
          }
        },
        stage:{
            type: dataTypes.ENUM,
            values: ["intro","1","2-1","2-2","2-3","3","4-1","4-2","finished"],
            defaultValue: "intro"
        },
        personalityType:{
            type: dataTypes.ENUM,
            values: ["-1","1","2","3","4","5","6","7","8","9"],
        },
        wingType:{
            type: dataTypes.ENUM,
            values: ["-1","1","2","3","4","5","6","7","8","9"],
        },
        altType:{
            type: dataTypes.ENUM,
            values: ["SP","SX","SOC"]
        }
    }); 
    
    TestSession.associate = function (models) {
      models.testSession.belongsTo(models.user, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        models.testSession.belongsTo(models.question);
    };

    return TestSession;
  }