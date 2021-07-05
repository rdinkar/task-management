/**
 * user boards container
 * maintains the state of users and their tasks
 */
import React, { useCallback, useState } from "react";
import Board from "../../components/Board";
import { Button, List } from "antd";
import InputModal from "../../components/InputModal";

const UserBoards = () => {
  const [state, updateState] = useState({
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    inputModalOpen: false,
  });
  const setState = useCallback(
    (st = {}) => {
      updateState(st)
      localStorage.setItem('users', JSON.stringify(st.users || []))
    }, [updateState]
  )
  const onInputModalSave = (value) => {
    setState({
      ...state,
      inputModalOpen: false,
      users: [...state.users, { user: value, tasks: [] }],
    });
  };
  const onInputModalCancel = () => {
    setState({
      ...state,
      inputModalOpen: false,
    });
  };
  const addUser = () =>
    setState({
      ...state,
      inputModalOpen: true,
    });
  const updateUserData = (user, idx, deleteFlag) => {
    const updatedUsers = [...state.users];
    if (deleteFlag) {
      updatedUsers.splice(idx, 1);
    } else {
      updatedUsers[idx] = user;
    }
    setState({
      ...state,
      users: updatedUsers,
    });
  };
  const onTaskMoved = (fromUserIndex, fromTaskIndex, toUserIndex) => {
    const updatedUsers = [...state.users];
    const movedTask = updatedUsers[fromUserIndex].tasks.splice(
      fromTaskIndex,
      1
    );
    updatedUsers[toUserIndex].tasks.push(movedTask);
    setState({
      ...state,
      users: updatedUsers,
    });
  };
  return (
    <div className="users-board">
      <div className="disp-flex justify-end margin-b-lg">
        <Button title="Add new user" onClick={addUser}>
          Add User
        </Button>
      </div>
      <List
        grid={{ gutter: 25, xs: 1, sm: 1, md: 2, lg: 4, xl: 6, xxl: 6 }}
        dataSource={state.users}
        renderItem={(user, i) => (
          <List.Item key={`${i}_${user.tasks.length}`}>
            <Board
              userIndex={i}
              data={user}
              updateUserData={(u, del) => updateUserData(u, i, del)}
              onTaskMoved={onTaskMoved}
            />
          </List.Item>
        )}
      />
      <InputModal
        open={state.inputModalOpen}
        onSave={onInputModalSave}
        onCancel={onInputModalCancel}
      />
    </div>
  );
};

export default UserBoards;
