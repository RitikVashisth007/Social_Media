import { Button, Input, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";

import Peer from "simple-peer";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const VideoChat = ({selectedUser, loginUser}) => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();


  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(loginUser?.user?._id);
      console.log(id);
    });

    socket.on("callUser", (data) => {
      console.log(data); 
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    }); 
  }, []);

  const callUser = (id) => {
    console.log("call user");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: selectedUser?._id,
        signalData: data,
        from: loginUser?.user?._id,
        name: selectedUser?.full_name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };
 
  const answerCall = () => {
    setCallAccepted(true);
    console.log("data");
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    }); 
    peer.on("signal", (data) => {
      console.log(data);
      socket.emit("answerCall", { signal: data, to: selectedUser?._id });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  }; 
  useEffect(() => {
    setIdToCall();
  }, []);
  return (
    <>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            ) : null}
          </div>
        </div>
        <div className="myId">
          <Input
            id="filled-basic"
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <div text={me} style={{ marginBottom: "2rem" }}>
            <Button variant="contained" color="primary">
              {me}
            </Button>
            <p>{me}</p>
          </div>

          <Input
            id="filled-basic"
            label="ID to call"
            variant="filled"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" onClick={leaveCall}>
                End Call
              </Button>
            ) : (
              <Button
                color="primary"
                aria-label="call"
                onClick={() => callUser(idToCall)}
              >
                call user
              </Button>
            )}
            {idToCall}
          </div>
        </div>
        <div>
            <div className="caller">
              <h1>{name} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div> 
        </div>
      </div>
    </>
  );
};

export default VideoChat;
