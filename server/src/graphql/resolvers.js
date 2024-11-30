const { History } = require("../models");

const resolvers = {
  Query: {
    // Fetch all history entries
    getAllHistories: async (_, __, { models }) => {
      try {
        return await models.History.findAll();
      } catch (error) {
        console.error("Error fetching histories:", error.message);
        throw new Error("Failed to fetch histories");
      }
    },

    // Fetch a history entry by ID
    getHistoryById: async (_, { id }, { models }) => {
      try {
        const history = await models.History.findByPk(id);
        if (!history) {
          throw new Error(`History with ID ${id} not found`);
        }
        return history;
      } catch (error) {
        console.error("Error fetching history by ID:", error.message);
        throw new Error("Failed to fetch history");
      }
    },
  },
  Mutation: {
    updateLastRelease: async (_, { id, last_release }, { models }) => {
      try {
        console.log(models);
        const historyObj = await History.findByPk(id);
        console.log("bello");
        if (!historyObj) {
          throw new Error(`History entry with id ${id} not found`);
        }

        await historyObj.update({ last_release });

        return historyObj;
      } catch (error) {
        console.error("Error updating last_release:", error.message);
        throw new Error("Failed to update last_release");
      }
    },
  },
};

module.exports = resolvers;
