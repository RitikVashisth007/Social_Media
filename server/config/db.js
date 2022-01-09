const mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();



const connectDB = async () =>{
  try {
      const conn = await mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex:true
      })
      console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (error) {
      console.log("Error in DB config");
      console.log(error.message);
      
  }
}

module.exports = connectDB;
