module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("History", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, // Auto-increment ID
        primaryKey: true, // Marks ID as the primary key
        allowNull: false,
      },
      uid: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      owner_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      repo_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_release: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("History");
  },
};
