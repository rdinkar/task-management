/**
 * board component of the user
 * maintains the tasks of the individual user
 */
import React, { useState } from "react";
import { List, Typography, Card, Modal } from "antd";
import {
  EditOutlined,
  ExclamationCircleOutlined,
  CloseOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Droppable } from "react-drag-and-drop";
import InputModal from "../InputModal";
import Task from "../Task";

const Board = ({ data, updateUserData, onTaskMoved, userIndex }) => {
  const [state, setState] = useState({
    inputModalOpen: false,
    inputModalData: {
      type: "Task",
      isEditModal: false,
      data: "",
      index: -1,
    },
  });
  const onInputModalSave = (value, type) => {
    if (type === "Task" && !state.inputModalData.isEditModal) {
      // add task
      updateUserData({
        ...data,
        tasks: [...data.tasks, value],
      });
    } else if (type === "Task" && state.inputModalData.isEditModal) {
      // edit task
      const updatedTasks = [...data.tasks];
      updatedTasks[state.inputModalData.index] = value;
      updateUserData({
        ...data,
        tasks: updatedTasks,
      });
    } else if (type === "User" && state.inputModalData.isEditModal) {
      // edit user
      updateUserData({
        ...data,
        user: value,
      });
    }
    setState({
      ...state,
      inputModalOpen: false,
    });
  };
  const onInputModalCancel = () => {
    setState({
      ...state,
      inputModalOpen: false,
    });
  };
  const openModal = (type, val, index) =>
    setState({
      ...state,
      inputModalOpen: true,
      inputModalData: {
        type,
        isEditModal: !!val,
        data: val,
        index: Number.isFinite(index) ? index : -1,
      },
    });
  const confirmDelete = (taskIdx) => {
    if (Number.isFinite(taskIdx)) {
      // confirm deletion for task
      Modal.confirm({
        title: `Delete ${data.tasks[taskIdx]}`,
        icon: <ExclamationCircleOutlined />,
        content: `Are you sure want to delete ${data.tasks[taskIdx]} ?`,
        onOk() {
          const updatedTasks = [...data.tasks];
          updatedTasks.splice(taskIdx, 1);
          updateUserData({ ...data, tasks: updatedTasks });
        },
      });
    } else {
      // confirm deletion for user
      Modal.confirm({
        title: `Delete ${data.user}`,
        icon: <ExclamationCircleOutlined />,
        content: `Are you sure want to delete ${data.user} ?`,
        onOk() {
          updateUserData(data, true);
        },
      });
    }
  };
  const onDrop = (data) => {
    const [fromUserIndex, taskIndex] = JSON.parse(data.task);
    if (userIndex !== fromUserIndex) {
      onTaskMoved(fromUserIndex, taskIndex, userIndex);
    }
  };
  return (
    <Droppable types={["task"]} onDrop={onDrop}>
      <Card
        title={<Typography.Text title={data.user}>{data.user}</Typography.Text>}
        extra={[
          <EditOutlined
            title="Edit user name"
            className="margin-r-md"
            style={{ fontSize: 20 }}
            key="edit"
            onClick={() => openModal("User", data.user)}
          />,
          <CloseOutlined
            title="Delete user"
            style={{ fontSize: 20 }}
            key="delete"
            onClick={() => confirmDelete()}
          />,
        ]}
      >
        <List
          className="tasks-list"
          dataSource={data.tasks}
          size="small"
          renderItem={(item, i) => (
            <Task
              key={`${i}_${data.tasks.length}`}
              userIndex={userIndex}
              taskIndex={i}
              data={item}
              openModal={openModal}
              onDeleteTask={() => confirmDelete(i)}
            />
          )}
          footer={
            <div className="disp-flex center">
              <PlusCircleOutlined
                title="Add task"
                style={{ fontSize: 20 }}
                onClick={() => openModal("Task")}
              />
            </div>
          }
        />
        <InputModal
          open={state.inputModalOpen}
          onSave={onInputModalSave}
          onCancel={onInputModalCancel}
          {...state.inputModalData}
        />
      </Card>
    </Droppable>
  );
};

Board.defaultProps = {
  updateUserData: () => null,
  onTaskMoved: () => null,
  data: {
    user: "",
    tasks: [],
  },
};

export default Board;
