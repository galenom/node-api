'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'firstName', { allowNull: false, type: Sequelize.STRING }),
      queryInterface.changeColumn('Users', 'lastName', { allowNull: false, type: Sequelize.STRING }),
      queryInterface.changeColumn('Users', 'email', { allowNull: false, type: Sequelize.STRING }),
      queryInterface.changeColumn('Users', 'username', { allowNull: false, type: Sequelize.STRING }),
      queryInterface.changeColumn('Users', 'password', { allowNull: false, type: Sequelize.STRING })
    ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'firstName', { allowNull: true, type: Sequelize.STRING }),
      queryInterface.changeColumn('Users', 'lastName', { allowNull: true, type: Sequelize.STRING }),
      queryInterface.changeColumn('Users', 'email', { allowNull: true, type: Sequelize.STRING }),
      queryInterface.changeColumn('Users', 'username', { allowNull: true, type: Sequelize.STRING }),
      queryInterface.changeColumn('Users', 'password', { allowNull: true, type: Sequelize.STRING })
    ])
  }
};