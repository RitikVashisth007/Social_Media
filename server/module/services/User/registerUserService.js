const { UserInputError } = require("apollo-server-errors");
const Joi = require("joi");
const datasources = require("../../datasource");

function registerInputValidation(input) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().required(),
  });

  const { error } = schema.validate(input);

  if (error) throw new UserInputError(error);
}

async function action(input) {
  const { name, email, password } = input;
  try {
    const user = await datasources.newUser({
      name,
      email,
      password,
      externalLogin: false,
      confirmed: false,
      user_type: "User",
    });

    return user;
  } catch (error) {
    if (error.code === 11000 || error.code === 11001)
      throw new Error(`There is an existing account with this email ${email}`);
    throw new Error(error);
  }
}

async function registerUserService(input) {
  registerInputValidation(input);

  const user = await action(input);

  return user;
}

module.exports.registerUserService = registerUserService;
