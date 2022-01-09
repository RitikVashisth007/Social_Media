const { merge} = require("lodash");

const allUsers = require("./User/allUser")
const loginUser = require("./User/loginUser")
const registerUser = require("./User/registerUser")
const createPost = require("./Post/createPost")
const Subscription = require("./Subscription/index")
const likeToggle = require("./Post/likeToggle")
const createComment = require("./Post/createComment")
const sendMessage = require("./Message/sendMessage");
const getMessages = require("./Message/getMessage");
const getPosts = require("./Post/getPost");
const getActiveChat = require("./Message/getActiveChat");

const resolvers =  merge(
    allUsers, 
    loginUser,
    registerUser, 
    createPost,
    Subscription,
    likeToggle,
    createComment,
    sendMessage,
    getMessages,
    getPosts,
    getActiveChat,
)



module.exports = resolvers
