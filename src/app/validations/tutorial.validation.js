const Joi = require("joi");

const createTutorial = Joi.object().keys({
  title: Joi.any().required(),
  description: Joi.string().required(),
  published: Joi.string().required(),
});

module.exports = { createTutorial };
