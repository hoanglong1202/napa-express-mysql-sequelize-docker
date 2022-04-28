const db = require("../models/configDb");
const Tutorial = db.tutorials;

module.exports = Object.freeze({
  create: async (data) => await Tutorial.create(data),
  findById: async (id) => await Tutorial.findByPk(id),
  findAll: async (condition) => await Tutorial.findAll({ where: condition }),
  removeById: async (id) =>
  await Tutorial.destroy({
      where: { id: id },
    }),
  updateById: async (data, id) =>
  await Tutorial.update(data, {
      where: { id },
    }),
});
