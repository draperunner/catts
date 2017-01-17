import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// route components
import App from '../../ui/containers/App';
import Welcome from '../../ui/containers/Welcome';
import Highscores from '../../ui/containers/Highscores';
import Help from '../../ui/containers/Help';
import Annotation from '../../ui/containers/Annotation';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="/highscores" component={Highscores} />
      <Route path="/help" component={Help} />
      <Route path="/annotate" component={Annotation} />
    </Route>
  </Router>
);
