import { Avatar, Dropdown, Typography } from "antd";
import React from "react";
import { MessageOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import CommentDropdown from "../CommentDropdown";
import { LIKE_TOGGLE } from "../../graphql/Mutation/LIkeToggle";
import HandleError from "../HandleError";
import { useMutation } from "@apollo/client";
import { GET_POST } from "../../graphql/Query/GetPosts";

const PostCard = ({ post, user }) => {
  const [likeToggleMutations] = useMutation(LIKE_TOGGLE, {
    onError: (error) => HandleError(error),
    refetchQueries: [GET_POST],
  });
  const likeToggle = (postID) => {
    likeToggleMutations({
      variables: { postId: postID },
    });
  };
  return (
    <div>
      <img src={post.contentUrl} alt="abc" style={{ borderRadius: 22 }} />
      <div className="flex justify-between items-center mx-2 mt-2">
        <div className="flex items-center">
          <div className="mr-2">
            <Avatar src="https://i.pravatar.cc/300" />
          </div>
          <div>
            <Typography.Text className="capitalize font-semibold">
              {post?.createdBy?.full_name}
            </Typography.Text>
          </div>
        </div>
        <div>
            <Typography.Text>{post?.content}</Typography.Text>
          </div>
        <div className="flex items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => likeToggle(post?._id)}
          >
            {post.likes?.filter((like) => like?.likedBy === user?.user?._id)
              ?.length > 0 ? (
              <HeartFilled
                style={{ fontSize: 22, marginRight: 4, color: "rgb(253 50 87" }}
              />
            ) : (
              <HeartOutlined style={{ fontSize: 22, marginRight: 4 }} />
            )}
            <Typography.Text>{post?.likeCount}</Typography.Text>
          </div>
          <Dropdown
            trigger={["click"]}
            overlay={<CommentDropdown post={post} />}
          >
            <div className="flex items-center ml-3 cursor-pointer">
              <MessageOutlined style={{ fontSize: 22, marginRight: 4 }} />
              <Typography.Text>{post?.commentCount}</Typography.Text>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
