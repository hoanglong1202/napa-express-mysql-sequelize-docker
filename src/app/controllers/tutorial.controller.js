const db = require("../models/configDb");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

const { tutorialService } = require("../servives");

// Create and Save a new Tutorial
exports.create = async (req, res, next) => {
  try {
    const { title, description, published } = req.body;
    console.log({ title, description, published })

    const tutorial = {
      title,
      description,
      published: published ? published : false,
    };
    await tutorialService.create(tutorial);

    res.send({
      status: "Success",
      message: "Create tutorial successfully",
      // dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res, next) => {
  try {
    const { title } = req.query;
    const result = await tutorialService.findAll(title);

    res.send({
      status: "Success",
      message: "Fetch data successfully",
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await tutorialService.findOne(id);

    res.send({
      status: "Success",
      message: "Fetch data successfully",
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;

    await tutorialService.update(req.body, id);

    res.send({
      status: "Success",
      message: "Update data successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    await tutorialService.delete(id);
    res.send({
      status: "Success",
      message: "Delete data successfully",
    });
  } catch (error) {
    next(error);
  }
};
