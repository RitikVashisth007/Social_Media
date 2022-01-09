import React, { useEffect, useState } from "react";
import { Card, Input, Button, notification, Typography, Avatar } from "antd";
import Message from "../Message/index";
import HandleError from "../../components/HandleError";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { PhoneOutlined, SendOutlined } from "@ant-design/icons/lib/icons";
import { GET_MESSAGE } from "../../graphql/Query/GetMessage";
import { NEW_MESSAGE } from "../../graphql/Subscriptions/NewMessage";
import { SEND_MESSAGE } from "../../graphql/Mutation/SendMessage";
import cx from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";
import { map, size, merge } from "lodash";
import VideoCallModal from "../Modals/VideoCallModal";

const ChatBox = ({ selectedUser, loginUser }) => {
  const [newMessage, setnewMessage] = useState();
  const [inputMessage, setinputMessage] = useState();
  const [allMessage, setAllMessage] = useState();
  const [callModal, setcallModal] = useState(false);
  const [fetchMsgs, { loading, error, data: messageData }] = useLazyQuery(
    GET_MESSAGE,
    {
      fetchPolicy: "network",
      notifyOnNetworkStatusChange: true,
    }
  );

  console.log(allMessage);

  useEffect(() => {
    fetchMsgs({ variables: { from: selectedUser?._id } });
  }, [selectedUser]);

  useEffect(() => {
    setAllMessage(messageData?.getMessages);
  }, [messageData]);

  const [sendMessageMutations] = useMutation(SEND_MESSAGE, {
    onError: (error) => HandleError(error),
    onCompleted: (data) => {
      setinputMessage("");
    },
  });
  const { error: subscriptionError } = useSubscription(NEW_MESSAGE, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const newMessage = subscriptionData.data?.newMessage;
      setnewMessage(newMessage);
    },
    onError: (error) => HandleError(error),
  });

  const sendMesssageHandler = () => {
    sendMessageMutations({
      variables: { input: { to: selectedUser?._id, content: inputMessage } },
    });
  };

  useEffect(() => {
    // console.log(merge(allMessage, { newMessage }));
    if (allMessage) {
      setAllMessage([newMessage, ...allMessage]);
    }

    console.log("helllo");
  }, [newMessage]);
  return (
    <div style={{ width: "92%" }}>
      {selectedUser ? (
        <Card
          title={
            <div className="flex">
              <div className="mr-3">
                <Avatar
                  src={`https://ui-avatars.com/api/?name=${selectedUser?.full_name}`}
                  size="large"
                />
              </div>
              <div className="flex flex-col">
                <Typography.Text>{selectedUser?.full_name}</Typography.Text>
                <Typography.Text className="text-xs">
                  {selectedUser?.email}
                </Typography.Text>
              </div>
            </div>
          }
          bodyStyle={{ background: "#172037", border: "none" }}
          style={{ border: "none" }}
          headStyle={{ background: "#272a34" }}
          extra={
            <PhoneOutlined
              style={{ fontSize: 24 }}
              onClick={() => setcallModal(true)}
            />
          }
        >
          <div
            className={cx(" overflow-auto flex px-2", {
              "flex-col-reverse": true,
            })}
            style={{ maxHeight: "58vh", minHeight: "500px" }}
          >
            <div>
              {!loading && (
                <InfiniteScroll
                  dataLength={size(allMessage)}
                  inverse={true}
                  className="flex flex-col-reverse"
                  scrollableTarget="scrollableDiv"
                  scrollThreshold={"100%"}
                  initialScrollY={0}
                >
                  {map(allMessage, (message, index) => {
                    const sent = message?.from?._id !== selectedUser?._id;
                    const withAvatar =
                      message?.from?._id !== allMessage[index + 1]?.from?._id;

                    return (
                      <Message
                        message={message}
                        sent={sent}
                        key={message?._id}
                        withAvatar={withAvatar}
                        selectedUser={selectedUser}
                      />
                    );
                  })}
                </InfiniteScroll>
              )}
            </div>
          </div>
          <div
            className="flex px-4 py-2 rounded-lg items-center"
            style={{ background: "#1C2437" }}
          >
            <Input.TextArea
              className="mt-3 break-words"
              style={{
                border: "none",
                minHeight: "30px",
                maxHeight: "80px",
                marginTop: 0,
                background: "transparent",
              }}
              autoSize
              value={inputMessage}
              onChange={(e) => setinputMessage(e?.target?.value)}
            />
            <div className="float-right mb-1 mr-1">
              <SendOutlined
                style={{ fontSize: 24, marginLeft: 8 }}
                onClick={sendMesssageHandler}
              />
            </div>
          </div>
        </Card>
      ) : (
        <div style={{ marginTop: 150 }}>
          <Typography.Text className="text-4xl font-semibold">
            Select User or start new chat to send messages
          </Typography.Text>
        </div>
      )}
      <VideoCallModal
        callModal={callModal}
        setcallModal={setcallModal}
        selectedUser={selectedUser}
        loginUser={loginUser}
      />
    </div>
  );
};

export default ChatBox;
