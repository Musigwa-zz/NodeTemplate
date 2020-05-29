const { sign } = require("jsonwebtoken");
const { JWT_KEY, regex } = require("../constants");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { len: [3, 100], isAlphanumeric: true },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: { args: false, msg: "Please provide a valid email address" },
        validate: { isEmail: true },
        unique: { args: true, msg: "Email address already in use!" },
      },
      password: {
        type: DataTypes.TEXT,
        is: regex.password,
        allowNull: { args: false, msg: "Password should be provided" },
      },
      telephone: {
        type: DataTypes.STRING(16),
        is: regex.phone,
        allowNull: { args: false, msg: "Telephone number should be provided" },
        unique: { args: true, msg: "Telephone number is already in use!" },
        validate: { len: [3, 100], isAlphanumeric: true },
      },
      avatar: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        is: regex.avatar,
        validate: { isUrl: true },
      },
      isVerified: { type: DataTypes.BOOL, defaultValue: false, allowNull: false },
    },
    {
      tableName: "users",
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ["deletedAt", "updatedAt"] },
        where: { deletedAt: null },
      },
      paranoid: true,
      hooks: {
        afterCreate(user, _options) {
          user.dataValues.token = user.generateToken();
        },
      },
    }
  );
  User.associate = function (_models) {};
  User.prototype.generateToken = function () {
    return sign({ id: this.id }, JWT_KEY);
  };
  return User;
};
