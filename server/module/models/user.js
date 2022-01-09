const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    full_name: String,
    user_name: String,
    email: {
      type: String,
      unique: true, // `email` must be unique
    },
    avatar: String,
    password: String,
    user_type: { type: String, default: "User" },
    confirmed: { type: Boolean, default: false }, 
    isPrivate: { type: Boolean, default: false }, 
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);


const User = model("user", userSchema);

module.exports = User;
