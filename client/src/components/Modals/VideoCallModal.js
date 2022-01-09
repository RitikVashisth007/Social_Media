import { Modal } from "antd";
import React from "react";
import VideoChat from "../VideoChat";

const VideoCallModal = ({ callModal, setcallModal, selectedUser, loginUser }) => {
  return (
    <Modal
      visible={callModal}
      footer={null}
      onCancel={() => setcallModal(false)}
      width="70%"
    >
      <VideoChat selectedUser={selectedUser} loginUser={loginUser} />
    </Modal>
  ); 
};

export default VideoCallModal;
