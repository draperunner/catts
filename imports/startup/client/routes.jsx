import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// route components
import App from '../../ui/containers/App';
import Welcome from '../../ui/containers/Welcome';
import Highscores from '../../ui/containers/Highscores';
import Guidelines from '../../ui/containers/Guidelines';
import Annotation from '../../ui/containers/Annotation';
import Download from '../../ui/containers/Download';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="/highscores" component={Highscores} />
      <Route path="/guidelines" component={Guidelines} />
      <Route path="/annotate" component={Annotation} />
      <Route path="/download" component={Download} />
    </Route>
  </Router>
);
