import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tweets = new Mongo.Collection('tweets');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tweets', () => Tweets.find());
}

Meteor.methods({
  'tweets.annotate'(tweetId, annotation) {
    check(tweetId, String);
    check(annotation, String);

    // Make sure the user is logged in before saving annotation
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // Tweets.update(tweetId, { $set: {} });
  },
});
