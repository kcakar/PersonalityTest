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
            values: ["1","2","3","4","5","6","7","8","9"],
        },
        wingType:{
            type: dataTypes.ENUM,
            values: ["1","2","3","4","5","6","7","8","9"],
        }
    }); 
    
    User.associate = function(models) {
        User.hasOne(models.TestSession);
        User.belongsTo(models.Company, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return User;
  }