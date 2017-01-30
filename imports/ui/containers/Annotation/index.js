import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
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
      return <div className="row"><div className="col-xs-12"><h1>Please log in</h1></div></div>;
    }

    const tweet = this.state.currentTweet;

    const title = 'Annotation';

    if (!this.state.tweets.length && this.state.doneTweets.length > 0) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <h1>{title}</h1>
            <h3>No available tweets! You must have annotated them all. Great job!</h3>
          </div>
        </div>
      );
    } else if (!this.state.tweets.length && this.state.doneTweets.length === 0) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <h1>{title}</h1>
            <h3>Loading tweets...</h3>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h1>{title}</h1>
            <h3>{ tweet ? <p key={tweet._id}>{tweet.text}</p> : null }</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <h4>Sentiment Annotation</h4>
            <RadioButtonGroup
              name="sentiment"
              valueSelected={this.state.annotations.sentiment}
              onChange={e => this.annotate('sentiment', e.target.value)}
            >
              <RadioButton value="positive" label="Positive" />
              <RadioButton value="neutral" label="Neutral" />
              <RadioButton value="negative" label="Negative" />
              <RadioButton value="none" label="I don't know" />
            </RadioButtonGroup>
          </div>
          <div className="col-xs-12 col-md-6">
            <h4>Sarcasm Annotation</h4>
            <RadioButtonGroup
              name="sarcasm"
              valueSelected={this.state.annotations.sarcasm}
              onChange={e => this.annotate('sarcasm', e.target.value)}
            >
              <RadioButton value="sarcastic" label="Sarcastic" />
              <RadioButton value="not-sarcastic" label="Not Sarcastic" />
              <RadioButton value="none" label="I don't know" />
            </RadioButtonGroup>
          </div>
        </div>
        <div className="row">
          <RaisedButton primary onClick={() => this.next()}>Next</RaisedButton>
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
