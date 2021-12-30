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
      queryInterface.addColumn('Reservation', 'experienceHourId', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Reservation', 'adults', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Reservation', 'teens', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Reservation', 'childrenOrYounger', {
        type: Sequelize.INTEGER,
      }),
    ])
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
