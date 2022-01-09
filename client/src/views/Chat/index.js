import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ACTIVE_CHAT } from "../../graphql/Query/GetActiveChat";
import ChatBox from "../../components/Chatbox/index";
import ActiveChat from "../../components/ActiveChats/index";
import { Button, Dropdown, Typography } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons/lib/icons";
import NewChat from "./NewChat";

const ChatPage = ({ user }) => {
  const [selectedUser, setselectedUser] = useState();
  const [newChatVisiblity, setnewChatVisiblity] = useState(false);
  const [fetchMsgs, { loading, error, data: messageData }] = useLazyQuery(
    GET_ACTIVE_CHAT,
    {
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true, 
    }
  );
  useEffect(() => {
    fetchMsgs();
  }, []);
  return (
    <div className="flex w-11/12 m-auto justify-between ">
      <div style={{ width: "30%" }}>
        <div className="flex justify-center my-2">
          <Dropdown
            overlay={
              <NewChat
                setnewChatVisiblity={setnewChatVisiblity}
                setselectedUser={setselectedUser}
                loginUser={user}
              />
            }
            trigger={["click"]}
            placement="bottomCenter"
            visible={newChatVisiblity}
            onVisibleChange={(flag) => setnewChatVisiblity(flag)}
          >
            <Button
              className="text-lg flex items-center"
              type="text"
              style={{ color: "white" }}
            >
              <PlusSquareOutlined style={{ fontSize: "22px" }} /> Start new chat
            </Button>
          </Dropdown>
        </div>
        <div>Recent Chat</div>
        {!loading &&
          messageData?.getActiveChat
            .map((user) => (
              <div onClick={() => setselectedUser(user)}>
                <ActiveChat user={user} />
              </div>
            ))
            .reverse()}
      </div>
      <div style={{ width: "65%" }}>
        <ChatBox selectedUser={selectedUser} loginUser={user} />
      </div>
    </div>
  );
};

export default ChatPage;
