const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const { merge, replace } = require("lodash");
const http = require("http");
const cors = require("cors");
const { PubSub } = require("graphql-subscriptions");
const WebSocket = require("socket.io");
const typeDefs = require("./module/schema/index");
const resolvers = require("./module/resolvers/index");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

const pubsub = new PubSub();

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),

  subscriptions: {
    onConnect: async (connectionParams) => {
      console.log("Connected!");
      const { Authorization } = connectionParams;
      const token = replace(Authorization, "Bearer ", "");
    },
    onDisconnect: async (_, socket) => {
      console.log("Disconnected!");
    },
  },
});

const httpServer = http.createServer(app);

// For video WEBRTC || Video Calls
const io = WebSocket(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  }); 
});
 
server.applyMiddleware({ app });
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  connectDB();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(
    `🚀 Graphql playgroud at http://localhost:${PORT}${server.subscriptionsPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
 