import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Radio } from 'antd';
import { Tweets } from '../../../api/tweets';
import AnnotationCounter from '../../components/AnnotationCounter';

class Annotation extends React.Component {

  constructor() {
    super();
    this.state = {
      tweets: [],
      doneTweets: [],
      currentTweet: null,
      annotations: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.tweets.length || this.state.tweets.length < 3) {
      const currTweets = this.state.tweets;
      const doneTweets = this.state.doneTweets;
      const newTweets = nextProps.tweets
        .filter(t => [...doneTweets, ...currTweets].map(ct => ct.id_str).indexOf(t.id_str) < 0);

      const newState = {
        tweets: [...currTweets, ...newTweets],
      };

      if (this.state.tweets.length === 0 && this.state.doneTweets.length === 0) {
        newState.tweets = newState.tweets.slice(1);
        newState.currentTweet = nextProps.tweets[0];
      }

      this.setState(newState);
    }
  }

  next() {
    Meteor.call('tweets.annotate', this.state.currentTweet._id, this.state.annotations);
    Meteor.call('user.addAnnotation', this.state.currentTweet._id, this.state.annotations);
    const newTweets = this.state.tweets.slice();
    const newDoneTweets = [...this.state.doneTweets, this.state.currentTweet];
    const newCurrentTweet = newTweets.shift();
    this.setState({
      tweets: newTweets,
      doneTweets: newDoneTweets,
      currentTweet: newCurrentTweet,
      annotations: {},
    });

    // Hack to reload the subscription to 'tweets'
    if (this.state.tweets.length < 10) {
      Meteor.subscribe('tweets');
    }
  }

  annotate(type, annotation) {
    const annotations = { ...this.state.annotations };
    annotations[type] = annotation;

    this.setState({
      annotations,
    });
  }

  render() {
    if (!this.props.currentUser) {
      return <div><h1>Please log in</h1></div>;
    }

    const tweet = this.state.currentTweet;

    const title = 'Annotation!';

    if (!this.state.tweets.length && this.state.doneTweets.length > 0) {
      return (
        <div>
          <h1>{title}</h1>
          <h3>No available tweets! You must have annotated them all. Great job!</h3>
        </div>
      );
    } else if (!this.state.tweets.length && this.state.doneTweets.length === 0) {
      return (
        <div>
          <h1>{title}</h1>
          <h3>Loading tweets...</h3>
        </div>
      );
    }

    return (
      <div>
        <h1>{title}</h1>
        <h3>{ tweet ? <p key={tweet._id}>{tweet.text}</p> : null }</h3>
        <div>
          <Radio.Group
            value={this.state.annotations.sentiment}
            size="large"
            onChange={e => this.annotate('sentiment', e.target.value)}
          >
            <Radio.Button value="positive" >Positive</Radio.Button>
            <Radio.Button value="neutral">Neutral</Radio.Button>
            <Radio.Button value="negative" >Negative</Radio.Button>
            <Radio.Button value="none">I don't know</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <Radio.Group
            value={this.state.annotations.sarcasm}
            size="large"
            onChange={e => this.annotate('sarcasm', e.target.value)}
          >
            <Radio.Button value="sarcastic">Sarcastic</Radio.Button>
            <Radio.Button value="not-sarcastic" >Not Sarcastic</Radio.Button>
            <Radio.Button value="none">I don't know</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <Button type="primary" onClick={() => this.next()}>Next</Button>
        </div>
        <div>
          <h1>
            <AnnotationCounter />
          </h1>
        </div>
      </div>
    );
  }
}

Annotation.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  // This will only return tweets that are not annotated by current user
  Meteor.subscribe('tweets');

  const tweets = Tweets.find().fetch();

  return {
    currentUser: Meteor.user(),
    tweets,
  };
}, Annotation);
