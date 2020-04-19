const passport = require("passport");
const { statusCodes, errorMessages } = require("../constants");
const async = require("./errorHandler");

module.exports = async((req, res, next) => {
  return passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error) throw new Error(errorMessages.UNAUTHORIZED);
    if (!user)
      {return res.status(statusCodes.UNAUTHORIZED).json({
        message: errorMessages.UNAUTHORIZED,
      });}
    req.user = user;
    return next();
  })(req, res, next);
});
