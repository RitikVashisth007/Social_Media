import React from "react";
import { Avatar, Tooltip, Typography } from "antd";
import cx from "classnames";
import styles from "./styles.module.css";

const Message = ({ message, sent, withAvatar, messageType, selectedUser }) => {
  if (messageType === "group") {
    return (
      <div className="flex">
        {withAvatar && (
          <div className="mr-2 mt-6">
            <Avatar src="https://ui-avatars.com/api/?name" />
          </div>
        )}
        <div className="mr-4">
          {withAvatar && (
            <div className="mt-6">
              <Typography.Text className="font-semibold">
                {message?.from?.full_name}
                
              </Typography.Text>
            </div>
          )}
          {!withAvatar && (
            <div className="ml-14 mb-1 ">
              <Typography.Text>{message?.content}</Typography.Text>
            </div>
          )}
          {withAvatar && (
            <div className="mb-1">
              <Typography.Text>{message?.content}</Typography.Text>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={cx("flex my-1", { "ml-auto": sent, "mr-auto": !sent })}>
      {withAvatar && !sent && (
        <div style={{ minWidth: 48 }}>
          <Avatar src={`https://ui-avatars.com/api/?name=${message.from?.full_name}`} />
        </div>
      )}
        <div
          className={cx(
            "py-2 px-3 rounded-bl-lg rounded-br-lg max-w-lg break-words",
            {
              [styles.incomingMessages]: !sent,
              "bg-gray-200": sent,
              "rounded-tr-lg": !sent,
              "rounded-tl-lg": sent,
              "ml-12": !withAvatar,
              "mr-12": !withAvatar,
            }
          )}
        >
          <div className={cx({ "text-white": !sent, "text-black": sent })}>
            {message.content}
          </div>
        </div>
      {withAvatar && sent && (
        <div style={{ minWidth: 48 }}>
          <Avatar src={`https://ui-avatars.com/api/?name=${message.from?.full_name}`} style={{marginLeft:8}} />
        </div>
      )}
    </div>
  );
};

export default Message;
