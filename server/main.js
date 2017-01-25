import { Meteor } from 'meteor/meteor';
import { Tweets } from '../imports/api/tweets';
import '../imports/api/all-users';
import '../imports/api/user';

import fixtures from './fixtures-999';

Meteor.startup(() => {
  if (Tweets.find().count() === 0) {
    fixtures.forEach((tweet) => {
      Tweets.insert(tweet);
    });
  }
});
