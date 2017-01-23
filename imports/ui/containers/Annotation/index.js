import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Radio } from 'antd';
import { Tweets } from '../../../api/tweets';
import AnnotationCounter from '../../components/AnnotationCounter';

class Annotation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: props.tweets || [],
      currentTweetIndex: -1,
      currentTweet: null,
      annotations: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.tweets.length && nextProps.tweets.length) {
      this.setState({
        tweets: nextProps.tweets || [],
        currentTweetIndex: 0,
        currentTweet: nextProps.tweets[0],
      });
    }
  }

  next() {
    Meteor.call('tweets.annotate', this.state.currentTweet._id, this.state.annotations);
    Meteor.call('user.addAnnotation', this.state.currentTweet._id, this.state.annotations);
    const nextIndex = (this.state.currentTweetIndex + 1) % this.props.tweets.length;
    this.setState({
      currentTweetIndex: nextIndex,
      currentTweet: this.props.tweets[nextIndex],
      annotations: {},
    });
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

    return (
      <div>
        <h1>Annotation!</h1>
        <h3>{ tweet ? <p key={tweet._id}>{tweet.text}</p> : null }</h3>
        <div>
          <Radio.Group value={this.state.annotations.sentiment} size="large" onChange={e => this.annotate('sentiment', e.target.value)}>
            <Radio.Button value="positive" >Positive</Radio.Button>
            <Radio.Button value="neutral">Neutral</Radio.Button>
            <Radio.Button value="negative" >Negative</Radio.Button>
            <Radio.Button value="none">I don't know</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <Radio.Group value={this.state.annotations.sarcasm} size="large" onChange={e => this.annotate('sarcasm', e.target.value)}>
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
  tweets: PropTypes.arrayOf(PropTypes.object),
};

export default createContainer(() => {
  Meteor.subscribe('tweets');

  return {
    currentUser: Meteor.user(),
    tweets: Tweets.find().fetch(),
  };
}, Annotation);
