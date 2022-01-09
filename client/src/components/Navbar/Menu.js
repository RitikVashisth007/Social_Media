import React from "react";
import { Menu, Switch, Divider } from "antd";
import {
  SettingOutlined,
  LinkOutlined,
  AppstoreAddOutlined,
  SearchOutlined,
  BellOutlined,
  SendOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;

const NavMenu = () => {
  const history = useHistory()
  const logoutHandler = () =>{
    localStorage.removeItem('userInfo')
    history.push('/login')
  }
  return (
    <div>
      <Menu
        style={{ background: "rgb(40, 42, 52)", marginTop: 20 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="vertical"
        theme="dark"
      >
        <Menu.Item
          style={{ display: "flex", alignItems: "center" }}
          key="1"
          icon={<AppstoreAddOutlined style={{ fontSize: 22 }} />}
        >
          Feed
        </Menu.Item>
        <Menu.Item
          style={{ display: "flex", alignItems: "center" }}
          key="2"
          icon={<SearchOutlined style={{ fontSize: 22 }} />}
        >
          Explore
        </Menu.Item>
        <Menu.Item
          style={{ display: "flex", alignItems: "center" }}
          key="3"
          icon={<BellOutlined style={{ fontSize: 22 }} />}
        >
          Notifications
        </Menu.Item>
        <Menu.Item
          style={{ display: "flex", alignItems: "center" }}
          key="4"
          icon={<SendOutlined style={{ fontSize: 22 }} />}
        >
          Direct
        </Menu.Item>
        <Menu.Item
          style={{ display: "flex", alignItems: "center" }}
          key="5"
          icon={<VideoCameraOutlined style={{ fontSize: 22 }} />}
        >
          IG TV
        </Menu.Item>
        <Menu.Item
          style={{ display: "flex", alignItems: "center" }}
          key="6"
          icon={<BarChartOutlined style={{ fontSize: 22 }} />}
        >
          Stats
        </Menu.Item>
        <Menu.Item
          style={{ display: "flex", alignItems: "center" }}
          key="7"
          icon={<SettingOutlined style={{ fontSize: 22 }} />}
        >
          Setting
        </Menu.Item>
        <Divider
          style={{ borderColor: "lightgrey", minWidth: "86%", maxWidth:"86%" , margin: "20px auto" }}
        />
        <Menu.Item
          style={{ display: "flex", alignItems: "center" }}
          key="link"
          icon={<LogoutOutlined style={{ fontSize: 22 }} />}
          onClick={logoutHandler}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavMenu;
