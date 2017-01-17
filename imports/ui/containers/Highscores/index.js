import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

const Highscores = (props) => {

  return (
    <div>
      <h1>Highscores!</h1>
    </div>
  );
};

Highscores.propTypes = {
};

export default createContainer(() => {
  return {
  };
}, Highscores);
