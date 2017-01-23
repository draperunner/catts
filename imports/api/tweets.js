import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tweets = new Mongo.Collection('tweets');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tweets', () => Tweets.find());
}

Meteor.methods({
  'tweets.annotate'(tweetId, annotations) {
    check(tweetId, String);
    check(annotations, Object);

    // Make sure the user is logged in before saving annotation
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // Push detailed annotation object including user info
    // Increment aggregated annotation stats for convenience
    const updateObject = {
      $push: { 'annotations.detailed': { user: this.userId, annotations } },
      $inc: { 'annotations.aggregated.count': 1 },
    };

    // updateObject.$inc[`annotations.aggregated.${type}.${annotation}`] = 1;

    Tweets.update(tweetId, updateObject);
  },
});
