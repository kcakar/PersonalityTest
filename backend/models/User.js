const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const keys=require('../config/keys');

const saltRounds = 8;

module.exports = (sequelize,dataTypes)=>{
    let User=sequelize.define('user', {
        status:{
            type:dataTypes.ENUM,
            values: ["active","passive","deleted"],
        },
        mail:{
            type:dataTypes.STRING(100),
            allowNull: false, 
            unique: true,
            validate:{
                notEmpty: true,
                len: [3,100]
            }
        },
        phone:{
            type:dataTypes.STRING(100),
        },
        password:{
            type:dataTypes.STRING(200),
            allowNull: false, 
            validate:{
                notEmpty: true,
                len: [3,200]
            }
        },
        name:{
            type:dataTypes.STRING(200),
            allowNull: false, 
            validate:{
                notEmpty: true,
                len: [3,200]
            }
        },
        title:{
            type:dataTypes.STRING(50),
            validate:{
                len: [0,50]
            }
        },
        testEndDate:{
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
        },
        credit:{
            type:dataTypes.INTEGER,
            validate:{
                isNumeric: true,
            }
        },
        companyId:{
            type:dataTypes.STRING(200),
        }
    }); 
    
    User.associate = function(models) {
        models.user.hasOne(models.testSession);
        models.user.hasMany(models.creditRequest);
        models.user.hasMany(models.saleHistory);
    };

    User.getHashPassword=(password)=>{
        return bcrypt.hash(password,saltRounds);
    }

    User.comparePassword=(password,hash)=>{
        return bcrypt.compare(password,hash);
    }

    User.generateJWT = (userModel)=>{
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);
      
        return jwt.sign({
          mail: userModel.mail,
          id: userModel.id,
          role:userModel.role,
          exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, keys.privateKey);
    }

    User.toAuthJSON=(userModel)=>{
        return{
            id:userModel.id,
            mail:userModel.mail,
            token:this.generateJWT(userModel)
        };
    }

    return User;
}