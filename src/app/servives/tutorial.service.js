const { findAll, create, findById, updateById, removeById } = require("../repositories/tutorial.repository");
const db = require("../models/configDb");
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (tutorial) => {
  // Save Tutorial in the database
  await create(tutorial);
  // return result;
};

// Retrieve all Tutorials from the database.
exports.findAll = async (title) => {
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  const result = await findAll(condition);

  return result;
};

exports.findOne = async (id) => {
  const result = await findById(id);

  return result;
};

exports.update = async (data, id) => {
  const result = await updateById(data, id);

  return result;
};

exports.delete = async (id) => {
  const result = await removeById(id);
  return result;
};
