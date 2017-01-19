import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Layout, Menu } from 'antd';
import AccountsUIWrapper from '../../components/AccountsUIWrapper';
import './App.css';

const { Header, Content, Footer } = Layout;

// App component - represents the whole app
const App = props =>
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/highscores">Highscores</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/help">Help</Link></Menu.Item>
        <Menu.Item key="4"><AccountsUIWrapper /></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        { props.children }
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
  </Layout>;

App.propTypes = {
  children: PropTypes.node,
};

export default createContainer(() => ({
}), App);
