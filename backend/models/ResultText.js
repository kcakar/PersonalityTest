module.exports = (sequelize,dataTypes)=>{
    let Result=sequelize.define('result', {
        text:{
            type:dataTypes.TEXT,
            allowNull: false, 
            validate:{
                notEmpty: true,
                len: [3,65535]
            }
        },
        language:{
            type:dataTypes.STRING(2),
            allowNull: false, 
            validate:{
                notEmpty: true,
                len: [2,2]
            }
        },
        part:{
            type:dataTypes.STRING(50),
            allowNull: false, 
            validate:{
                len: [1,50]
            }
        },
    }); 
    
    Result.associate = function(models) {
        models.result.belongsTo(models.user, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
    };

    return Result;
  }