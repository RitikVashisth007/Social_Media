import { notification } from "antd";

const HandleError = (error) => {
  openNotificationWithIcon("error", error);
};

const openNotificationWithIcon = (type, error) => {
  notification[type]({
    message: <p style={{color:"white"}} >Login Error</p>,
    description: `${error.message}`,
    style:{
      background: "#282A34",
      color:"white",
      borderRadius:"8px"
    }
  });
};

export default HandleError
