import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

/**
  * Returns a span element containing the number of tweets the logged in user has annotated
  */

const AnnotationCounter = (props) => {
  if (!props.currentUser) return null;

  const annotations = props.currentUser.profile.annotations;

  return (
    <div>
      <h1>
        { (annotations && annotations.aggregated.count) || 0 }
      </h1>
    </div>
  );
};

AnnotationCounter.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => ({
  currentUser: Meteor.user(),
}), AnnotationCounter);
