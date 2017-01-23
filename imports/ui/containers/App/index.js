import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Layout } from 'antd';
import Header from '../../components/Header';
import '../../../startup/accounts-config.js';
import './App.css';

const { Content, Footer } = Layout;

// App component - represents the whole app
const App = props =>
  <Layout className="layout">
    <Header />
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
