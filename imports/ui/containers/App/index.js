import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../../components/Header';
import '../../../startup/accounts-config.js';
import './App.css';

// App component - represents the whole app
const App = props =>
  <MuiThemeProvider>
    <div>
      <Header />
      <div className="container">
        { props.children }
      </div>
    </div>
  </MuiThemeProvider>;

App.propTypes = {
  children: PropTypes.node,
};

export default createContainer(() => ({
}), App);
