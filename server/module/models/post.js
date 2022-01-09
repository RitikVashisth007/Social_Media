const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    contentUrl:String,
    content:String,
    comments: [
        {
        comment: String,
        username: String,
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        },
        {timestamps:  true}
    ],
    likes: [
        {
        username: String,
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
        },{timestamps:  true} 
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);


const PostModel = model("post", postSchema);

module.exports = PostModel;
