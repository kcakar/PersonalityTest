module.exports = (sequelize,dataTypes)=>{
    let User=sequelize.define('user', {
        username:{
            type:dataTypes.STRING(50),
            allowNull: false, 
            unique: true,
            validate:{
                notEmpty: true,
                len: [3,50]
            }
        },
        password:{
            type:dataTypes.STRING(50),
            allowNull: false, 
            validate:{
                notEmpty: true,
                len: [3,50]
            }
        },
        title:{
            type:dataTypes.STRING(50),
            validate:{
                len: [0,50]
            }
        },
        testDate:{
            type:dataTypes.DATE
        },
        personalityType:{
            type: dataTypes.ENUM,
            values: ["-1","1","2","3","4","5","6","7","8","9"],
        },
        wingType:{
            type: dataTypes.ENUM,
            values: ["-1","1","2","3","4","5","6","7","8","9"],
        },
        role:{
            type:dataTypes.ENUM,
            values: ["admin","company","employee"],
        }
    }); 
    
    User.associate = function(models) {
        models.user.hasOne(models.testSession);
        models.user.belongsTo(models.company, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return User;
  }