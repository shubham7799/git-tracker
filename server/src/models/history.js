const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {}
  }

  History.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      uid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID cannot be null" },
          isInt: { msg: "User ID must be an integer" },
        },
      },
      owner_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: { msg: "Repository Name cannot be null" },
          len: [0, 30],
        },
      },
      repo_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: { msg: "Repository Name cannot be null" },
          len: [0, 30],
        },
      },
      last_release: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isInt: { msg: "Release ID must be an integer" },
        },
      },
    },
    {
      sequelize,
      modelName: "History",
      tableName: "History",
    }
  );

  return History;
};
