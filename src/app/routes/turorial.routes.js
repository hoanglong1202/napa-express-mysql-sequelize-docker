const express = require("express");
const { tutorialController } = require("../controllers");
const { tutorialValidation } = require("../validations");
const validator = require("express-joi-validation").createValidator({ passError: true });

const router = express.Router();

// Create a new Tutorial
router.post("/", validator.body(tutorialValidation.createTutorial), tutorialController.create);

// Retrieve all tutorial
router.get("/", validator.query(tutorialValidation.findAllTutorial), tutorialController.findAll);

// Retrieve a single Tutorial with id
router.get("/:id", validator.params(tutorialValidation.findByIdTutorial), tutorialController.findOne);

// Update a Tutorial with id
router.put("/:id", validator.params(tutorialValidation.findByIdTutorial), tutorialController.update);

// Delete a Tutorial with id
router.delete("/:id", validator.params(tutorialValidation.findByIdTutorial), tutorialController.delete);

module.exports = router;
