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
      queryInterface.addColumn('Listing', 'adultCapacity', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Listing', 'teenCapacity', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Listing', 'childOrYoungerCapacity', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Listing', 'visitWithOwner', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn('Listing', 'privateOrCollective', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Listing', 'familyWelcome', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('ListingData', 'adultPrice', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('ListingData', 'teenPrice', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('ListingData', 'childOrYoungerPrice', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('ListingData', 'duration', {
        type: Sequelize.INTEGER,
      }),
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
