const User = require("../../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function newUser({
    email,
  password,
  name,
  avatar = "",
  ...props
}) {
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    full_name: name,
    email,
    password: await bcrypt.hash(password, 10),
    avatar,
    ...props,
  });
  const user = await newUser.save();
  return user;
}

module.exports.newUser = newUser;
