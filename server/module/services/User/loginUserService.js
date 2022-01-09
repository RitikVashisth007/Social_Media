const Joi = require("joi");
const { UserInputError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const generateToken  = require("../../../utils/generateToken");
const datasources = require("../../datasource");

async function userExistsValidation(email) {
  try {
    const user = await datasources.getUser({ email });
    if (!user) throw new Error(`No such user found with this email ${email}`);

    return user;
  } catch (error) {
    throw new Error(error);
  }
}

function loginInputValidation(input) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(input);

  if (error) throw new UserInputError(error);
}

async function userLoginValidation(user, password) {
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }
}

async function loginUserService({ email, password }) {
  loginInputValidation({ email, password });
  const user = await userExistsValidation(email);

  await userLoginValidation(user, password);

  const token = generateToken(user._id);
  return {
    token: token,
    user,
  };
}

module.exports.loginUserService = loginUserService;
