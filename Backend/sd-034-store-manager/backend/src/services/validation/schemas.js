const Joi = require('joi');

const nameValid = Joi.string().min(5).required();

module.exports = { nameValid };