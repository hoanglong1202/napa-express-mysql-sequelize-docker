const Joi = require("joi");

const createTutorial = Joi.object().keys({
  title: Joi.any().required(),
  description: Joi.string().required(),
  published: Joi.string().required(),
});

const findAllTutorial = Joi.object().keys({
  title: Joi.any().required(),
});

const findByIdTutorial = Joi.object().keys({
  id: Joi.any().required(),
});

module.exports = { createTutorial, findAllTutorial, findByIdTutorial };
