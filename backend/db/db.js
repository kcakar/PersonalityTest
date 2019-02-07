const Sequelize = require('sequelize');
const Question=require('./Models/Question');

const sequelize = new Sequelize('enneagram', 'root', 'rootkerem', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



  Question.sync().then(() => {
  // Table created
  return Question.create({
    dateCreated: new Date(),
    text:"deneme sorusu",
    order:1,
    personalityType:1,
    language:"tr"
  });
});