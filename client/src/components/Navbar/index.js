import React from "react";
import NavMenu from "./Menu";
import UserDetails from "./UserDetails";
import Applogo from "../../assets/logo.png";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory()
  return (
    <div style={{ background: "#282A34", width: 280, height: "100vh" }}>
      <div>
        <img src={Applogo} alt="App logo" className="h-14 mb-4 cursor-pointer" onClick={()=> history.push('/')} />
      </div>
      <UserDetails />
      <NavMenu />
    </div>
  );
};

export default Navbar;
