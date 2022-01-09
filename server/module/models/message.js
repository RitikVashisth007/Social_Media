const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    content: String,
    from: { type: Schema.Types.ObjectId, ref: "user" },
    to: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Message = model("message", messageSchema);

module.exports = Message;