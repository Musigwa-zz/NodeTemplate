const Joi = require("@hapi/joi");

const schema = Joi.object({
  deskID: Joi.string()
    .length(11)
    .uppercase()
    .required()
});

module.exports = schema;
