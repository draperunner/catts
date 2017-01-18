import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Button } from 'antd';

const Welcome = props => (
  <div>
    <h1>Welcome!</h1>
    <p>Annotating tweets is a cool thing to do. Are you ready?</p>
    <Button type="primary"><Link to="/annotate">Start Annotation</Link></Button>
  </div>
  );

Welcome.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => ({
  currentUser: Meteor.user(),
}), Welcome);
