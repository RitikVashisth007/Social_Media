import { Button, Input, Select, Card, Avatar, Typography } from "antd";
import { AntSelect } from "../../components/FormikInput/index";
import { Field, Form, Formik } from "formik";
import React, { useRef } from "react";
import { map } from "lodash";
import * as yup from "yup";
import { useQuery } from "@apollo/client";
import { GET_ALL_USER } from "../../graphql/Query/GetAllUser";
const validationSchema = yup.object().shape({
  selectUsers: yup.string().required("This field is required"),
});

const NewChat = ({ setnewChatVisiblity, setselectedUser, loginUser }) => {
  const { loading, data: allUserData, error } = useQuery(GET_ALL_USER);

  const allUsersData = loading
    ? []
    : allUserData?.allUser.filter((item) => item?._id !== loginUser.user?._id);
  console.log(loginUser);
  const formRef = useRef();

  const onSubmit = () => {
    formRef.current.submitForm();
  };

  const handleCancel = () => {
    setnewChatVisiblity(false);
  };

  const handleDone = (values) => {
    console.log(values);
    setselectedUser(
      allUserData?.allUser.find((item) => item._id === values.selectUsers)
    );
    setnewChatVisiblity(false);
  };
  return (
    <Card
      className="p-5 -mt-12"
      style={{
        width: "340px",
        minHeight: "210px",
        boxShadow: "none",
        border: "none",
        padding: 8,
        background: "rgb(23, 32, 55)",
        borderRadius: 8,
      }}
      bodyStyle={{ padding: 4 }}
    >
      <Formik
        initialValues={{ selectUsers: [] }}
        validationSchema={validationSchema}
        onSubmit={handleDone}
        innerRef={formRef}
      >
        {({ submitCount, setFieldValue, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Field
                component={AntSelect}
                name="selectUsers"
                label={
                  <Typography.Text>Search by name or email</Typography.Text>
                }
                placeholder="Search by name or email"
                submitCount={submitCount}
                inputType="select"
                hasFeedback
                required={true}
                size="large"
                showSearch
                dropdownStyle={{}}
                selectOptions={map(!loading && allUsersData, (user) => {
                  return {
                    value: user?._id,
                    label: (
                      <div>
                        <Avatar size={30} style={{ marginRight: 12 }} />
                        <Typography.Text>{user?.full_name}</Typography.Text>
                      </div>
                    ),
                  };
                })}
                getPopupContainer={(node) => node.parentNode}
                dropdownRender={(menu) => <div>{menu}</div>}
              />
            </Form>
          );
        }}
      </Formik>
      <div className="w-full flex mt-6 justify-around">
        <Button
          style={{ background: "grey", border: "none", padding: "2px 40px" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          style={{
            background:
              "linear-gradient(to right, rgb(228, 59, 105), rgb(249, 169, 71))",
            border: "none",
            padding: "2px 40px",
          }}
          onClick={onSubmit}
        >
          Done
        </Button>
      </div>
    </Card>
  );
};

export default NewChat;
