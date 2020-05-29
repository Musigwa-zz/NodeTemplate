"use strict";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          fullName: "John Doe",
          email: "johndoe@email.com",
          password: "$2y$12$bA837jSTPy92gvI1IjkBCeRpDzp43a.HtG0n2/mZvHJ.YX/S7o7VS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
