const passport = require('passport');
const { statusCodes, errorMessages } = require('../constants');
const async = require('./errorHandler');

module.exports = async((req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (error, user) => {
    let error = new Error(errorMessages.UNAUTHORIZED);
    error.status = statusCodes.UNAUTHORIZED;
    if (error || !user) throw error;
    else {
      req.user = user;
      return next();
    }
  })(req, res, next);
});
