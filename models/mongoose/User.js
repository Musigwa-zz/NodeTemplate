const { sign } = require("jsonwebtoken");
const { Schema, model } = require("mongoose");
const { genSalt, hash, compare } = require("bcrypt");

const { JWT_SECRET, regex } = require("../constants");

const User = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 15,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    telephone: {
      type: String,
      required: true,
      unique: true,
      maxlength: 13,
      minlength: 10,
      trim: true,
      validate: regex.phone,
    },
    password: {
      type: String,
      select: false,
      trim: true,
      required: true,
      maxlength: 255,
      minlength: 5,
      validate: regex.password,
    },
    avatar: {
      type: String,
      trim: true,
      default: null,
      validate: regex.avatar,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        const { _id, password: _p, __v, ...rest } = ret;
        return rest;
      },
    },
    timestamps: true,
  }
);

User.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await genSalt(10);
    const hashed = await hash(this.password, salt);
    this.password = hashed;
    return next();
  } catch (error) {
    return next(error);
  }
});

User.methods.compare = function (password) {
  return compare(password, this.password);
};

User.methods.genAuthToken = function () {
  const { id, role, email } = this;
  return sign({ id, role, email }, JWT_SECRET, { expiresIn: 3600 });
};

module.exports = model("users", User);
