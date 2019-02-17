const jwt = require('express-jwt');
const keys=require('../config/keys');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

const onlyAdmins=(err, user, next)=>{
  next();
}

const auth = {
  required: jwt({
    secret: keys.privateKey,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: keys.privateKey,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
  onlyAdmins:onlyAdmins
};




module.exports = auth;