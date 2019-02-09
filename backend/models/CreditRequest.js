module.exports = (sequelize,dataTypes)=>{
    let CreditRequest=sequelize.define('creditRequest', {
        amount:{
            type:dataTypes.INTEGER,
            allowNull: false, 
            validate:{
                notEmpty: true
            }
        },
        status: {
            type: dataTypes.ENUM,
            allowNull: false,
            values: ["accepted","rejected","waiting"],
            validate:{
                notEmpty: true,
            }
        }
    }); 
    
    CreditRequest.associate = function(models) {
        models.creditRequest.belongsTo(models.company);
    };

    return CreditRequest;
  }