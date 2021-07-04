/**
 * task component
 * renders the task and gives the option to edit and delete it
 */
import React from 'react'
import { Draggable } from 'react-drag-and-drop'
import { List, Space } from 'antd'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'

const Task = ({ userIndex, taskIndex, data, openModal, onDeleteTask }) => {
  return <Draggable
    className="move task-list-item"
    type="task"
    data={JSON.stringify([userIndex, taskIndex])}
  >
    <List.Item>
      <span className="task-text">{data}</span>
      <Space>
        <EditOutlined title="Edit task" onClick={() => openModal('Task', data, taskIndex)} />
        <CloseOutlined title="Delete task" onClick={() => onDeleteTask()} />
      </Space>
    </List.Item>
  </Draggable>
}

Task.defaultProps = {
  data: '',
  openModal: () => null,
  onDeleteTask: () => null,
}

export default Task