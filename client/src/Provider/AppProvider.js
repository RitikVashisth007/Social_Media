import React from "react";
import { Redirect } from "react-router";

const AppProvider = ({ children }) => {
  const token = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const user = token;
  if (user) {
    return React.cloneElement(children, { user });
  } else return <Redirect to="/login" />;
};

export default AppProvider;
