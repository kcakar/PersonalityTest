module.exports = (sequelize,dataTypes)=>{
    let SaleHistory=sequelize.define('saleHistory', {
        amount:{
            type:dataTypes.INTEGER,
            allowNull: false, 
            validate:{
                notEmpty: true
            }
        },
        price:{
            type:dataTypes.DECIMAL(10,3),
            allowNull:false,
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
    
    SaleHistory.associate = function(models) {
        models.saleHistory.belongsTo(models.company);
        models.saleHistory.belongsTo(models.creditRequest);
    };

    return SaleHistory;
  }