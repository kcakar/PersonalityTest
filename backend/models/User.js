const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const keys=require('../config/keys');

const saltRounds = 8;

module.exports = (sequelize,dataTypes)=>{
    let User=sequelize.define('user', {
        email:{
            type:dataTypes.STRING(100),
            allowNull: false, 
            unique: true,
            validate:{
                notEmpty: true,
                len: [3,100]
            }
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
          email: userModel.email,
          id: userModel.id,
          role:userModel.role,
          exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, keys.privateKey);
    }

    User.toAuthJSON=(userModel)=>{
        return{
            id:userModel.id,
            email:userModel.email,
            token:this.generateJWT(userModel)
        };
    }

    return User;
}