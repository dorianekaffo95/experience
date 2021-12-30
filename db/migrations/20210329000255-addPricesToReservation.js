'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      return Promise.all([
        queryInterface.addColumn('Reservation', 'adultPrice', {
          type: Sequelize.FLOAT,
        }),
        queryInterface.addColumn('Reservation', 'teenPrice', {
          type: Sequelize.FLOAT,
        }),
        queryInterface.addColumn('Reservation', 'childOrYoungerPrice', {
          type: Sequelize.FLOAT,
        })
      ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
