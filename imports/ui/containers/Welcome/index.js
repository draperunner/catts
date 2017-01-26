import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const Welcome = () => (
  <div className="row">
    <div className="col-xs-12">
      <h1>Welcome!</h1>
      <p>Annotating tweets is a cool thing to do. Are you ready?</p>
      <Link to="/annotate"><RaisedButton primary label="Start Annotation" /></Link>
    </div>
  </div>
  );

Welcome.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => ({
  currentUser: Meteor.user(),
}), Welcome);
