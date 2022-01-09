import { SendOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Input } from "antd";
import React, { useState } from "react";
import { ADD_COMMENT } from "../../graphql/Mutation/AddComment";
import { GET_POST } from "../../graphql/Query/GetPosts";
import HandleError from "../HandleError";
import CommentCard from "./CommentCard";

const CommentDropdown = ({ post }) => {
  const [inputComment, setinputComment] = useState();
  const [addCommentMutations] = useMutation(ADD_COMMENT, {
    onError: (error) => HandleError(error),
    onCompleted: (data) => {
      setinputComment("");
    },
    refetchQueries: [GET_POST],
  });
  const addCommentHandler = () => {
    addCommentMutations({
      variables: { input: { postId: post?._id, comment: inputComment } },
    });
  };
  return (
    <div
      style={{
        width: 320,
        height: 360,
        background: "rgb(39, 42, 52)",
        borderRadius: 10,
      }}
      className="flex flex-col justify-between"
    >
      <div>
        {post?.commentCount === 0 && <div>No Comments</div>}
        {post.comments.map((comment) => (
          <CommentCard comment={comment} />
        ))}
      </div>

      <div
        className="flex px-4 py-2 rounded-lg items-center"
        style={{ background: "#1C2437" }}
      >
        <Input
          className="mt-3 break-words"
          style={{
            minHeight: "30px",
            maxHeight: "80px",
            marginTop: 0,
            background: "transparent",
          }}
          placeholder="Write comments"
          autoSize
          value={inputComment}
          onChange={(e) => setinputComment(e?.target?.value)}
        />
        <div className="float-right mb-1 mr-1">
          <SendOutlined
            style={{ fontSize: 24, marginLeft: 8 }}
            onClick={addCommentHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentDropdown;
