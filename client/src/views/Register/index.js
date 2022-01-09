import { Button, Card, Divider, notification } from "antd";
import React, { useEffect } from "react";
import { Formik, Field, Form as FormikForm } from "formik";
import { AntInput } from "../../components/FormikInput";
import * as yup from "yup";
import { Redirect, useHistory } from "react-router-dom";
import HandleError from "../../components/HandleError";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../graphql/Mutation/Register";
import Applogo from "../../assets/logo.png";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  name: yup.string().required("Name is required"),
  password: yup.string().max(255).required("Password is required"),
});

const Register = () => {
  const history = useHistory();
  const [loginMutations, { data }] = useMutation(REGISTER, {
    onError: (error) => HandleError(error),
    onCompleted: (data) => {
      history.push("/login");
      notification["success"]({
        message: "Account Created ",
        descritpion: "Account Created login plz",
      });
    },
  });
  const handleRegister = (value) => {
    loginMutations({
      variables: {
        input: {
          name: value?.name,
          email: value.email.toLowerCase(),
          password: value.password,
        },
      },
    });
  };
  return (
    <div
      className="flex h-screen justify-center"
      style={{ backgroundColor: "#eff2f5" }}
    >
      <div style={{ marginTop: "20vh" }}>
        <Card style={{ width: 420, borderRadius: 10 }} className="shadow-lg">
          <div className="flex items-center justify-center">
            <img
              src={Applogo}
              alt="App logo"
              className="h-14 mb-4 cursor-pointer"
            />
          </div>
          <Formik
            onSubmit={handleRegister}
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
          >
            {({ submitCount, handleSubmit }) => {
              return (
                <FormikForm onSubmit={handleSubmit}>
                  <Field
                    name="name"
                    component={AntInput}
                    style={{
                      height: 48,
                      borderRadius: "10px",
                      marginTop: 10,
                    }}
                    placeholder="Enter Full name"
                    type="email"
                    submitCount={submitCount}
                    hasFeedback
                    required={true}
                  />
                  <Field
                    name="email"
                    component={AntInput}
                    style={{
                      height: 48,
                      borderRadius: "10px",
                    }}
                    placeholder="Email address"
                    type="email"
                    submitCount={submitCount}
                    hasFeedback
                    required={true}
                  />
                  <Field
                    name="password"
                    component={AntInput}
                    style={{
                      height: 48,
                      borderRadius: "10px",
                    }}
                    placeholder="Password"
                    type="password"
                    submitCount={submitCount}
                    hasFeedback
                    required={true}
                  />
                  <div className="flex flex-col mt-4 ">
                    <Button
                      type="primary"
                      style={{ height: 48, borderRadius: "10px", fontSize: 18 }}
                      key="submit"
                      onClick={handleSubmit}
                    >
                      Register
                    </Button>
                    <Button type="text" style={{ fontSize: 16, marginTop: 10 }}>
                      Forgotten Password
                    </Button>
                  </div>

                  <Divider />
                  <div className="flex justify-center">
                    <Button
                      style={{
                        background: "rgb(190 190 190 / 20%)",
                        color: "white",
                        height: 48,
                        borderRadius: "10px",
                        fontSize: 18,
                      }}
                      onClick={() => history.push("/login")}
                    >
                      Already Have an Account
                    </Button>
                  </div>
                </FormikForm>
              );
            }}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default Register;
