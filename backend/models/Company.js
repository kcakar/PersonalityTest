module.exports = (sequelize,dataTypes)=>{
    let Company=sequelize.define('company', {
        status:{
            type:dataTypes.ENUM,
            values: ["active","passive","deleted"],
        },
        name:{
            type:dataTypes.STRING(50),
            unique: true,
            validate:{
                len: [0,50]
            }
        },
        mail:{
            type:dataTypes.STRING(100),
            unique: true,
            validate:{
                isEmail: true,
            }
        },
        phone:{
            type:dataTypes.STRING(100),
        },
        credit:{
            type:dataTypes.INTEGER,
            validate:{
                isNumeric: true,
            }
        }
    }); 
    
    Company.associate = function(models) {
        models.company.hasMany(models.user);
        models.company.hasMany(models.creditRequest);
        models.company.hasMany(models.saleHistory);
    };


    return Company;
  }