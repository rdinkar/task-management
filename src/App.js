import React from 'react'
import Header from './components/Header'
import { Layout } from 'antd'
import UserBoards from './containers/UserBoards'

const App = () => <>
  <Header />
  <Layout.Content>
    <UserBoards />
  </Layout.Content>
</>

export default App;
