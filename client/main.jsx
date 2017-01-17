import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { renderRoutes } from '../imports/startup/client/routes.jsx';

import 'antd/dist/antd.css';
import './main.css';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
