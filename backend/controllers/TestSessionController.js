const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const defaultQuestions = require("../config/questions");

const TestSessionController = {};
TestSessionController.create = function(req, res) {
  let { id } = req.params;
  let { testSession } = req.body;

  try {
    if (
      req.user.role !== "company" ||
      req.user.status !== "active" ||
      req.user.id !== parseInt(id)
    ) {
      res.sendStatus(401);
    } else if (req.user.credit <= 0) {
      res.status(412).json({ message: "Hakkınız bitti." });
    } else {
      models.sequelize
        .transaction(t => {
          return models.user
            .getHashPassword(testSession.password)
            .then(hashPassword => {
              return models.user.create(
                {
                  name: testSession.name,
                  password: hashPassword,
                  status: "active",
                  mail: testSession.mail,
                  title: testSession.title,
                  role: "employee",
                  companyId: req.user.id
                },
                { transaction: t }
              );
            })
            .then(dbUser => {
              return models.testSession.create(
                {
                  userId: dbUser.id,
                  stage: "intro"
                },
                { transaction: t }
              );
            })
            .then(() => {
              return models.user.decrement(
                { credit: "1" },
                { where: { id: req.user.id }, transaction: t }
              );
            })
            .then(affectedRows => {
              if (affectedRows <= 0) {
                throw "Şirkete ulaşılamadı";
              }
              return models.user.findByPk(req.user.id, { transaction: t });
            })
            .then(user => {
              if (user.credit < 0) {
                throw "Hakkınız bitti";
              } else {
                return user;
              }
            });
        })
        .then(r => {
          res.sendStatus(200);
        })
        .catch(err => {
          if (err === "Hakkınız bitti") {
            res.status(412).json({ message: err });
          } else {
            let errors = [];
            if (err.errors) {
              errors = err.errors;
            } else {
              errors = [{ message: err }];
            }
            res.status(400).json({ errors: errors });
          }
        });
    }
  } catch (err) {
    res.sendStatus(400);
  }
};

TestSessionController.getOneTest = function(req, res) {
  res.send("NOT IMPLEMENTEDGET");
};

TestSessionController.updateTest = function(req, res) {
  let { id } = req.params;
  let { testSession } = req.body;

  try {
    if (
      req.user.role !== "employee" ||
      req.user.status !== "active" ||
      req.user.id !== parseInt(id)
    ) {
      res.sendStatus(401);
    } else {
      models.testSession
        .update(
          { ...testSession },
          {
            where: { userId: req.user.id }
          }
        )
        .then(r => {
          res.sendStatus(200);
        })
        .catch(err => {
          let errors = [];
          if (err.errors) {
            errors = err.errors;
          } else {
            errors = [{ message: err }];
          }
          res.status(400).json({ errors: errors });
        });
    }
  } catch (err) {
    res.sendStatus(400);
  }
};

TestSessionController.createAnswer = function(req, res) {
  let { id } = req.params;
  let { answer, nextQuestionId } = req.body;

  if (
    req.user.role !== "employee" ||
    req.user.status !== "active" ||
    req.user.id !== parseInt(id)
  ) {
    res.sendStatus(401);
  } else {
    models.sequelize
      .transaction(t => {
        return models.userAnswer
          .destroy(
            { where: { userId: req.user.id, questionId: answer.questionId } },
            { transaction: t }
          )
          .then(r => {
            return models.userAnswer.create(
              { ...answer, userId: req.user.id },
              { transaction: t }
            );
          })
          .then(answer => {
            return models.testSession.findOne({
              where: {
                userId: req.user.id
              },
              include: [
                {
                  model: models.question,
                  attributes: ["order"]
                }
              ],
              transaction: t
            });
          })
          .then(session => {
            let updateObject = { questionId: nextQuestionId };

            if (!session.question) {
              updateObject.startDate = new Date();
            } else if (
              defaultQuestions.stage1Length === session.question.order+1
            ) {
              updateObject.stage = "2-1";
            }

            return models.testSession.update(updateObject, {
              where: { userId: req.user.id },
              transaction: t
            });
          });
      })
      .then(r => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);

        let errors = [];
        if (err.errors) {
          errors = err.errors;
        } else {
          errors = [{ message: err }];
        }
        res.status(400).json({ errors: errors });
      });
  }
};

const calculateStage1Result = (answers, deniedOptions) => {
  let personalityTypes = [
    { personalityType: "1", value: 0 },
    { personalityType: "2", value: 0 },
    { personalityType: "3", value: 0 },
    { personalityType: "4", value: 0 },
    { personalityType: "5", value: 0 },
    { personalityType: "6", value: 0 },
    { personalityType: "7", value: 0 },
    { personalityType: "8", value: 0 },
    { personalityType: "9", value: 0 }
  ];
  answers.map(answer => {
    personality = personalityTypes.find(
      t => t["personalityType"] === answer.question.personalityType
    );
    personality.value += parseInt(answer.selectedOption);
  });

  personalityTypes.sort((a, b) => {
    return b.value - a.value;
  });
  personalityTypes = personalityTypes.splice(0, 4);
  personalityTypes = personalityTypes.filter(
    p => deniedOptions.indexOf(p.personalityType) === -1
  );
  console.log(personalityTypes);
  return personalityTypes.map(e => e.personalityType);
};

TestSessionController.saveStage2Answer = function(req, res) {
  let { id, lang } = req.params;
  let nextStage = null;
  let dbTestSession = null;
  let dbOptions = [];
  try {
    if (
      req.user.role !== "employee" ||
      req.user.status !== "active" ||
      req.user.id !== parseInt(id)
    ) {
      res.sendStatus(401);
    } else {
      //find the test session
      return models.testSession
        .findOne({
          where: { userId: req.user.id }
        })
        .then(testSession => {
          dbTestSession = testSession;
          switch (testSession.stage) {
            case "1":
              //stage 1 is finished. calculate the result to decide next question
              nextStage = "2-1";
              return dbGetStage2_1Options(req.user.id, lang);
              break;

            default:
              break;
          }
        })
        .then(options => {
          dbOptions = options;
          //set new stage for the test session
          return dbTestSession.update({ stage: nextStage });
        })
        .then(result => {
          res.status(200).json({ options: dbOptions });
        })
        .catch(err => {
          console.log(err);
          let errors = [];
          if (err.errors) {
            errors = err.errors;
          } else {
            errors = [{ message: err }];
          }
          res.status(400).json({ errors: errors });
        });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

TestSessionController.getUserStage = function(req, res) {
  let { id, lang } = req.params;

  try {
    if (
      req.user.role !== "employee" ||
      req.user.status !== "active" ||
      req.user.id !== parseInt(id)
    ) {
      res.sendStatus(401);
    } else {
      models.testSession
        .findOne({
          attributes: ["stage", "personalityType"],
          where: {
            userId: req.user.id
          },
          include: [
            {
              model: models.question,
              attributes: ["order"]
            }
          ]
        })
        .then(session => {
          if (session.stage === "1" || session.stage === "intro") {
            return TestSessionController.getStageOne(req, res, session);
          } else if (session.stage === "2-1") {
            return TestSessionController.getStage2Question(req, res, session);
          } else if (session.stage === "3") {
            return TestSessionController.getStage3Question(req, res, session);
          } else {
            return TestSessionController.getStage4Question(req, res, session);
          }
        })
        .catch(err => {
          res.sendStatus(400);
        });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

TestSessionController.getStageOne = function(req, res, session) {
  let { lang } = req.params;
  let questions = [];
  let options = [];
  models.question
    .findAll({
      attributes: ["id", "text", "order"],
      where: {
        language: lang,
        stage: "1"
      }
    })
    .then(result => {
      questions = result;
      return models.testOption.findAll({
        attributes: ["option1", "option2", "option3", "option4", "option5"],
        where: {
          language: { [Op.eq]: req.params.lang }
        }
      });
    })
    .then(dbOptions => {
      options = dbOptions.length > 0 ? dbOptions[0] : [];
      let currentQuestion = session.question ? session.question.order : 1;
      res.json({ questions, options, stage: session.stage, currentQuestion });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: err });
    });
};

TestSessionController.getStage2Question = function(req, res, session) {
  let { lang } = req.params;
  let { deniedOptions } = req.body;
  let dbOptions = [];

  dbGetStage2Options(req.user.id, lang, deniedOptions)
    .then(options => {
      dbOptions = options;
    })
    .then(result => {
      res.status(200).json({ stageOptions: dbOptions, stage: session.stage });
    })
    .catch(err => {
      console.log(err);
      let errors = [];
      if (err.errors) {
        errors = err.errors;
      } else {
        errors = [{ message: err }];
      }
      res.status(400).json({ errors: errors });
    });
};

const dbGetStage2Options = (userId, lang, deniedOptions) => {
  if (!deniedOptions) {
    deniedOptions = [];
  }
  //get all the answers
  return models.userAnswer
    .findAll({
      where: { userId },
      include: [
        {
          model: models.question,
          attributes: ["personalityType", "wingType", "altType"]
        }
      ]
    })
    .then(answers => {
      //derive top 4 personality types from answers
      personalityTypes = calculateStage1Result(answers, deniedOptions);
      let stage = deniedOptions.length + 1;

      return models.question.findAll({
        attributes: ["id", "personalityType", "stage", "text"],
        where: {
          language: lang,
          stage: "2-" + stage,
          personalityType: { in: personalityTypes }
        }
      });
    });
};

TestSessionController.getStage3Question = function(req, res, session) {
  let { lang } = req.params;
  let dbOptions = [];
  models.question
    .findAll({
      attributes: ["id", "wingType", "stage", "text"],
      where: {
        language: lang,
        stage: "3",
        personalityType: session.personalityType
      }
    })
    .then(options => {
      dbOptions = options;
    })
    .then(result => {
      res.status(200).json({ stageOptions: dbOptions, stage: session.stage });
    })
    .catch(err => {
      console.log(err);
      let errors = [];
      if (err.errors) {
        errors = err.errors;
      } else {
        errors = [{ message: err }];
      }
      res.status(400).json({ errors: errors });
    });
};

TestSessionController.getStage4Question = function(req, res, session) {
  let { lang } = req.params;
  let { deniedOptions } = req.body;
  let dbOptions = [];

  if (!deniedOptions) {
    deniedOptions = [];
  }
  let stage = deniedOptions.length + 1;

  let altTypes = ["SP", "SX", "SOC"];
  altTypes = altTypes.filter(type => deniedOptions.indexOf(type) === -1);

  models.question
    .findAll({
      attributes: ["id", "altType", "stage", "text"],
      where: {
        language: lang,
        stage: "4-" + stage,
        personalityType:session.personalityType,
        altType: { in: altTypes }
      }
    })
    .then(options => {
      dbOptions = options;
    })
    .then(result => {
      res.status(200).json({ stageOptions: dbOptions, stage: session.stage });
    })
    .catch(err => {
      console.log(err);
      let errors = [];
      if (err.errors) {
        errors = err.errors;
      } else {
        errors = [{ message: err }];
      }
      res.status(400).json({ errors: errors });
    });
};

TestSessionController.getResults = function(req, res) {
  models.testSession
    .findOne({
      where: {
        userId: req.user.id
      }
    })
    .then(result => {
      res.json({ result });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
}


TestSessionController.getAnswers = function(req, res) {
  if(req.user.role!=="admin"){
    res.sendStatus(401);
      return;
  }
  try{
      models.userAnswer.findAll(
          {
              attributes:["selectedOption"],
              where:{
                  userId:req.params.userId
              },
              include: [{
                model: models.question,
                attributes: ["text", "personalityType", "order"]
            }],
          }
      ).then(result=>{
          res.json(result);
      })
      .catch(err=>{
          res.status(400).json({error:err});
      });
  }
  catch(err){
    console.log(err)
      res.sendStatus(400);
  }
}

module.exports = TestSessionController;
