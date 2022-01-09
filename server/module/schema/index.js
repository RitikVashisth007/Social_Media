const Queries = require("./queries");
const User = require("./user");
const Input = require("./input");
const Mutations = require("./mutations");
const AuthPayload = require("./authPayload");
const Post = require("./post");
const Comments = require("./comment");
const Like = require("./like");
const Subscription = require("./subscriptions");
const Message = require("./message"); 

const typeDefs = [
    Queries,
    User,
    Input,
    Mutations,
    AuthPayload,
    Post, 
    Comments,
    Like,
    Subscription,
    Message
]

module.exports = typeDefs