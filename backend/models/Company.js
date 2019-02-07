module.exports = (sequelize,dataTypes)=>{
    let Company=sequelize.define('company', {
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
        name:{
            type:dataTypes.STRING(50),
            validate:{
                len: [0,50]
            }
        },
        mail:{
            type:dataTypes.STRING(100),
            validate:{
                isEmail: true,
            }
        },
        phone:{
            type:dataTypes.STRING(100),
            validate:{
                isNumeric: true,
            }
        },
        credit:{
            type:dataTypes.INTEGER,
            validate:{
                isNumeric: true,
            }
        }
    }); 
    
    Company.associate = function(models) {
        models.Company.hasMany(models.User);
    };

    return Company;
  }