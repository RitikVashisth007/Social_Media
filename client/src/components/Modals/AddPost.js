import { useMutation } from "@apollo/client";
import { Button, Card, Input, notification } from "antd";
import React, { useState } from "react";
import { CREATE_POST } from "../../graphql/Mutation/CreatePost";
import { GET_POST } from "../../graphql/Query/GetPosts";
import { Formik, Field, Form as FormikForm } from "formik";
import { AntInput } from "../../components/FormikInput";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  content: yup.string().required("Caption is required"),
  contentUrl: yup.string().required("IMG URL is required"),
});

const AddPost = ({ setIsModalVisible }) => {
  const [postMutation, { data }] = useMutation(CREATE_POST, {
    onCompleted: () => {
      setIsModalVisible(false);
      notification["success"]({
        message: "Post Created ",
      });
    },
    refetchQueries: [{ query: GET_POST }],
  });

  const createPostHandler = (value) => {
    postMutation({
      variables: {
        input: { content: value?.content, contentUrl: value?.contentUrl },
      },
    });
  };

  return (
    <div>
      <Card>
        <Formik
          onSubmit={createPostHandler}
          initialValues={{ content: "", contentUrl: "" }}
          validationSchema={validationSchema}
        >
          {({ submitCount, handleSubmit }) => {
            return (
              <FormikForm onSubmit={handleSubmit}>
                <Field
                  name="contentUrl"
                  component={AntInput}
                  style={{
                    height: 48,
                    borderRadius: "10px",
                    marginTop: 10,
                  }}
                  placeholder="Enter the img URL"
                  submitCount={submitCount}
                  hasFeedback
                  lable="URL"
                  required={true}
                />
                <Field
                  name="content"
                  component={AntInput}
                  style={{
                    height: 48,
                    borderRadius: "10px",
                    marginTop: 10,
                  }}
                  placeholder="Enter captions for the Post"
                  submitCount={submitCount}
                  hasFeedback
                  required={true}
                />
                <Button type="primary" className="mt-4" onClick={handleSubmit}>
                  Create Post
                </Button>
              </FormikForm>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
};

export default AddPost;
