const Joi = require("@hapi/joi");
const phone = require("joi-phone-number");

const { regex } = require("../constants");

module.exports = {
  fullName: Joi.string().trim().min(3).alphanum().uppercase().required(),
  telephone: Joi.extend(phone)
    .string()
    .trim()
    .min(10)
    .max(13)
    .phoneNumber({ defaultCountry: "RW", format: "international" })
    .required(),
  email: Joi.string().trim().email({ minDomainAtoms: 2 }).regex(regex.email),
  password: Joi.string()
    .trim()
    .regex(regex.password)
    .error(new Error("Avatar must contain [uppercase, lowercase, number, symbol]")),
  avatar: Joi.string()
    .regex(regex.avatar)
    .trim()
    .uri()
    .error(new Error("Picture must be at most 5MB of [jpeg, png]")),
  isVerified: Joi.boolean().default(false),
};
