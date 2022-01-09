import React from "react";
import ChatPage from "../views/Chat";
import Home from "../views/Home";

const routes = ({ match: { path }, user }) => { 
  switch (path) {
    case "/":
      return <Home user={user} />;
    case "/profile":
      return <div>profile</div>;
    case "/chat":
      return <ChatPage user={user}  />;
    default:
      return <div>not found</div>;
  }
};
export default routes;
