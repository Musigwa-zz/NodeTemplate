const { regex } = require("../constants");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      fullName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: { len: [3, 100], isAlphanumeric: true },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: { args: false, msg: "Please provide a valid email address" },
        validate: { isEmail: true },
        unique: { args: true, msg: "Email address already in use!" },
      },
      password: {
        type: Sequelize.TEXT,
        is: regex.password,
        allowNull: { args: false, msg: "Password should be provided" },
      },
      telephone: {
        type: Sequelize.STRING(16),
        is: regex.phone,
        allowNull: { args: false, msg: "Telephone number should be provided" },
        unique: { args: true, msg: "Telephone number is already in use!" },
        validate: { len: [3, 100], isAlphanumeric: true },
      },
      avatar: {
        type: Sequelize.STRING(255),
        defaultValue: null,
        is: regex.avatar,
        validate: { isUrl: true },
      },
      isVerified: { type: Sequelize.BOOL, defaultValue: false, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      deletedAt: { type: Sequelize.DATE, default: null },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("users");
  },
};
