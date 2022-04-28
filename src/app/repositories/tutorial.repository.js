const db = require("../models/configDb");
const Tutorial = db.tutorials;

module.exports = Object.freeze({
  create: async (data) => Tutorial.create(data),
  findById: async (id) => Tutorial.findByPk(id),
  findAll: async (condition) => Tutorial.findAll({ where: condition }),
  removeById: async (id) =>
    Tutorial.destroy({
      where: { id: id },
    }),
  updateById: async (data, id) =>
    Tutorial.update(data, {
      where: { id: id },
    }),
});
