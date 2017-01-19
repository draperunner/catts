import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

const Highscores = () => (
  <div>
    <h1>Highscores!</h1>
  </div>
);

export default createContainer(() => ({
}), Highscores);
