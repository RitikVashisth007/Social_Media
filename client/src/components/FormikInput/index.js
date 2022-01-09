import React, { Fragment } from "react";
import { DatePicker, Form, Input, TimePicker, Select, Checkbox } from "antd";

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea, Password } = Input;

const CreateAntField = (AntComponent) => ({
  field,
  form,
  hasFeedback,
  label,
  selectOptions,
  submitCount,
  inputType,
  checkboxText,
  required,
  withLabel = null,
  onCallBackChange,
  ...props
}) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target }) => {
    const { value } = target;
    form.setFieldValue(field.name, value);
  };

  const onChange = (value, obj) => {
    if (inputType === "checkbox") {
      const {
        target: { checked },
      } = value;
      form.setFieldValue(field.name, checked);
    } else {
      if (withLabel) form.setFieldValue(withLabel, obj.label);
      form.setFieldValue(field.name, value);
    }
    onCallBackChange && onCallBackChange(value);
  };
  const onBlur = () => form.setFieldTouched(field.name, true);

  return (
    <div className="field-container w-full" style={{ margin: "0.25em" }}>
      <FormItem
        className="mb-0"
        hasFeedback={
          (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        }
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? "error" : "success"}
        label={label}
        required={required}
        labelCol={{ span: 24 }}
      >
        <AntComponent
          {...field}
          {...props}
          onBlur={onBlur}
          onChange={inputType ? onChange : onInputChange}
        >
          {inputType && (
            <Fragment>
              {selectOptions &&
                selectOptions.map((item) => (
                  <Option key={item.value} value={item.value}>
                    <div className="flex items-center">
                      {item.meta}
                      {item.label}
                    </div>
                  </Option>
                ))}
              {inputType === "checkbox" && checkboxText}
            </Fragment>
          )}
        </AntComponent>
      </FormItem>
    </div>
  );
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntTimePicker = CreateAntField(TimePicker);
export const AntTextArea = CreateAntField(TextArea);
export const AntInputPassword = CreateAntField(Password);
export const AntCheckBox = CreateAntField(Checkbox);
export const AntItemField = CreateAntField(Form.Item);