const { allUsers } = require("./User/allUser");
const { getUser } = require("./User/getUser");
const { newUser } = require("./User/newUser"); 
const { createPost } = require("./Post/createPost"); 
const { likeToggle } = require("./Post/likeToggle"); 
const { createComment } = require("./Post/createComment"); 
const { sendMessage } = require("./Message/sendMessage"); 
const { getMessage } = require("./Message/getMessage");
const { getPosts } = require("./Post/getPosts")
const { getAllMessage } = require("./Message/getAllMessage")



module.exports = {
    allUsers,
    getUser,
    newUser,
    createPost,
    likeToggle,
    createComment,
    sendMessage,
    getMessage,
    getPosts,
    getAllMessage,
};
     