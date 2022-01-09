import React, { Children } from "react";
import { Layout } from "antd";
import { withRouter } from "react-router";
import { instanceOf } from "prop-types";
import Navbar from "../components/Navbar";
import MainHeader from "../components/Header/Header";

const { Header, Footer, Sider, Content } = Layout;

const MainLayout = ({ children, user }) => {
  return (
    <Layout className="h-screen">
      <Sider width="280">
        <Navbar />
      </Sider>
      <Layout >
        <Header style={{background:"#3D3F51"}}  ><MainHeader/></Header>
        <Content style={{background:"#3D3F51"}} >
          <div className="h-full" user={user} >
            {Children.map(children, (child) => {
              return React.cloneElement(child, { user });
            })}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

MainLayout.propTypes = {
  children: instanceOf(Object),
  location: instanceOf(Object),
};

export default withRouter(MainLayout);
