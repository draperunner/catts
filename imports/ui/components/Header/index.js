import React from 'react';
import { Link } from 'react-router';
import { Layout, Menu } from 'antd';
import AccountsUIWrapper from '../../components/AccountsUIWrapper';

const AntHeader = Layout.Header;

const Header = () => (
  <AntHeader>
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
  </AntHeader>
);

export default Header;
