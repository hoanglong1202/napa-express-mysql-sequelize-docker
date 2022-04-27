const express = require("express");
const { tutorialController } = require("../controllers");
const { tutorialValidation } = require("../validations");
const validator = require("express-joi-validation").createValidator({ passError: true });

const router = express.Router();

// Create a new Tutorial
router.post("/", validator.body(tutorialValidation.createTutorial), tutorialController.create);

// Retrieve all tutorial
router.get("/", tutorialController.findAll);

// Retrieve all published tutorial
router.get("/published", tutorialController.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", tutorialController.findOne);

// Update a Tutorial with id
router.put("/:id", tutorialController.update);

// Delete a Tutorial with id
router.delete("/:id", tutorialController.delete);

// Delete all tutorial
router.delete("/", tutorialController.deleteAll);

module.exports = router;
