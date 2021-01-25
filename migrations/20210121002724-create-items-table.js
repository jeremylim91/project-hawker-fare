module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.DECIMAL,
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //= ====================================================
    //= ====================================================

    await queryInterface.createTable('people', {
      id: {
        allowNull: false,
        autoIncreement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      bill_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'bills',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('people');
    await queryInterface.dropTable('bills');
  },
};
