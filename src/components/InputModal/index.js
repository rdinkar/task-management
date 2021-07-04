/**
 * single input form modal
 * based on the props serves the name of user or task (provides edit input also)
 */
import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const InputModal = ({ open, onSave, onCancel, type, isEditModal, data }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);
  const handleSubmit = (values, hasError) => {
    if (!hasError) {
      onSave(values.value, type);
    }
  };
  return (
    <Modal
      title={`${isEditModal ? "Edit" : "Add"} ${type}`}
      visible={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={(v) => handleSubmit(v, true)}
        initialValues={isEditModal ? { value: data } : {}}
      >
        <Form.Item
          label={`${type} name`}
          name="value"
          rules={[
            {
              required: true,
              message: `Please input ${String(type).toLowerCase()} name`,
            },
          ]}
        >
          <Input autoFocus />
        </Form.Item>
      </Form>
    </Modal>
  );
};

InputModal.defaultProps = {
  open: false,
  onSave: () => null,
  onCancel: () => null,
  type: "User",
  isEditModal: false,
  data: "",
};

export default InputModal;
