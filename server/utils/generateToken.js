const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

  function generateToken(userId, duration = "365d") {
    const token = jwt.sign({ userId }, process.env.JWT_KEY, {
      expiresIn: duration, 
    });
  
    return token;
  }
  


  module.exports = generateToken