import { Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";

const CommentCard = ({ comment }) => {
  return (
    <div className="flex p-2 mb-2">
      <Avatar
        src={`https://ui-avatars.com/api/?name=${comment.createdBy?.full_name}`}
        size="large"
      />
      <div className="flex flex-col ml-2" >
        <Typography.Text className="font-semibold mr-2 capitalize text-base">
          {comment.createdBy?.full_name}
        </Typography.Text>
        <Typography.Text>{comment.comment}</Typography.Text>
      </div>
    </div>
  );
};

export default CommentCard;
