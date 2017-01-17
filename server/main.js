import { Meteor } from 'meteor/meteor';
import { Tweets } from '../imports/api/tweets';

import mockTweets from './fixtures';

Meteor.startup(() => {

  if (Tweets.find().count() === 0) {

    for (i = 0; i < mockTweets.length; i++) {
    	Tweets.insert(mockTweets[i]);
    }
  }
});
