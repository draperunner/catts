import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

const Help = (props) => {

  return (
    <div>
      <h1>Help!</h1>
    </div>
  );
};

Help.propTypes = {
};

export default createContainer(() => {
  return {
  };
}, Help);
