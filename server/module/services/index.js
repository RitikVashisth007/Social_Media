const { getAllUser} = require("./User/allUserService");
const { loginUserService} = require("./User/loginUserService");
const { registerUserService} = require("./User/registerUserService");
const { createPostService} = require("./Post/createPost");
const { getPostsService} = require("./Post/getPosts");
const { likeToggleService} = require("./Post/likeToggleService");
const { createCommentService} = require("./Post/createComment");
const { sendMessageService} = require("./Message/sendMessageService");
const { getMessageService} = require("./Message/getMessageService");
const { getActiveChatService} = require("./Message/getActiveChatService");


module.exports = {
    getAllUser,
    loginUserService,
    registerUserService,
    createPostService,
    likeToggleService,
    createCommentService,
    sendMessageService,
    getMessageService,
    getPostsService,
    getActiveChatService,
  };
  