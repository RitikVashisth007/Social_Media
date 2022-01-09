import {
  BellOutlined,
  PlusOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Input, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AddPost from "../Modals/AddPost";
import styles from "./styles.module.css";

const MainHeader = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <div className="flex justify-between">
        <div>
          <Input
            prefix={<SearchOutlined style={{ fontSize: 20 }} />}
            placeholder="Search"
            style={{
              background: "#474B5B",
              border: "none",
              borderRadius: "8px",
            }}
            size="large"
            className={styles.searchInput}
          />
        </div>
        <div className="flex items-center">
          <div className="flex mr-4">
            <BellOutlined style={{ fontSize: 22, marginRight: 22 }} />
            <SendOutlined
              style={{ fontSize: 22, marginRight: 10 }}
              onClick={() => history.push("/chat")}
            />
          </div>
          <div
            className="flex items-center cursor-pointer"
            style={{
              background: "linear-gradient(to right, #E43B69, #F9A947)",
              height: "56%",
              padding: "2px 10px",
              borderRadius: "8px",
            }}
            onClick={() => setIsModalVisible(true)}
          >
            <PlusOutlined style={{ fontSize: 22, marginRight: 4 }} />
            Add Post
          </div>
        </div>
      </div>
      <Modal
        title={<Typography.Text>ADD POST</Typography.Text>}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <AddPost setIsModalVisible={setIsModalVisible} />
      </Modal>
    </>
  );
};

export default MainHeader;
