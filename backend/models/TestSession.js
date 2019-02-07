module.exports = (sequelize,dataTypes)=>{
    let TestSession=sequelize.define('testSession', {
        startDate:{
          type:dataTypes.DATE,
          validate:{
            isDate:true
          }
        }
    }); 
    
    TestSession.associate = function (models) {
      models.TestSession.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
    };

    return TestSession;
  }