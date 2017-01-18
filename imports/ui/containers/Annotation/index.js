import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Tweets } from '../../../api/tweets';

class Annotation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: props.tweets || [],
      currentTweetIndex: 0,
    };
  }

  render() {
    if (!this.props.currentUser) {
      return <div><h1>Please log in</h1></div>;
    }

    return (
      <div>
        <h1>Annotation!</h1>
        {this.props.tweets.map(tweet => <p key={tweet._id}>{tweet.text}</p>)}
      </div>
    );
  }
}

Annotation.propTypes = {
  currentUser: PropTypes.object,
  tweets: PropTypes.arrayOf(PropTypes.object),
};

export default createContainer(() => {
  Meteor.subscribe('tweets');

  return {
    currentUser: Meteor.user(),
    tweets: Tweets.find().fetch(),
  };
}, Annotation);
