import { Meteor } from 'meteor/meteor';
import { Tweets } from '../imports/api/tweets';

import mockTweets from './fixtures';

Meteor.startup(() => {
  if (Tweets.find().count() === 0) {
    mockTweets.forEach((tweet) => {
      Tweets.insert(tweet);
    });
  }
});
