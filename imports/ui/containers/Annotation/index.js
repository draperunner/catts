import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button } from 'antd';
import { Tweets } from '../../../api/tweets';

class Annotation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: props.tweets || [],
      currentTweetIndex: 0,
    };
  }

  annotate(tweetId, sentiment) {
    this.setState({
      currentTweetIndex: (this.state.currentTweetIndex + 1) % this.props.tweets.length,
    });

    Meteor.call('tweets.annotate', tweetId, sentiment);
  }

  render() {
    if (!this.props.currentUser) {
      return <div><h1>Please log in</h1></div>;
    }

    const tweet = this.props.tweets[this.state.currentTweetIndex];

    return (
      <div>
        <h1>Annotation!</h1>
        { tweet ? <p key={tweet._id}>{tweet.text}</p> : null }
        <Button onClick={() => this.annotate(tweet._id, 'positive')}>Positive</Button>
        <Button onClick={() => this.annotate(tweet._id, 'neutral')}>Neutral</Button>
        <Button onClick={() => this.annotate(tweet._id, 'negative')}>Negative</Button>
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
