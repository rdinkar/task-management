/**
 * header component of the app
 */
import React from 'react'
import { Layout, Typography, Avatar, Row, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons';

const Header = () => {
  return <Layout.Header className="disp-flex vcenter">
    <Row justify="space-between" align="middle" style={{ width: '100%' }} >
      <Col xs={20} md={14}>
        <Typography.Title ellipsis level={4} style={{ color: '#fff' }} title="Task Management System">Task Management System</Typography.Title>
      </Col>
      <Col xs={4} md={10}>
        <Avatar.Group title="Guest User" className="disp-flex justify-end vcenter" >
          <Avatar icon={<UserOutlined />} />
          <Typography.Text ellipsis className="clr-white margin-l-md guest-user-text">Guest User</Typography.Text>
        </Avatar.Group>
      </Col>
    </Row>
  </Layout.Header>
}

export default Header