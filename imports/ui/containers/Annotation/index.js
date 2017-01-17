import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Tweets } from '../../../api/tweets';

const Annotation = (props) => {

  if (!props.currentUser) {
    return <div><h1>Please log in</h1></div>;
  }

  console.log(props.tweets);

  return (
    <div>
      <h1>Annotation!</h1>
      {props.tweets.map(tweet => <p>{tweet.text}</p>)}
    </div>
  );
};

Annotation.propTypes = {
  currentUser: PropTypes.object,
  tweets: PropTypes.arrayOf(PropTypes.object)
};

export default createContainer(() => {

  Meteor.subscribe('tweets');

  return {
    currentUser: Meteor.user(),
    tweets: Tweets.find().fetch()
  };
}, Annotation);
