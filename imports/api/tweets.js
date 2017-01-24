import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tweets = new Mongo.Collection('tweets');

if (Meteor.isServer) {
  // This will only expose tweets that are not annotated by current user
  Meteor.publish('tweets', function () {
    return Tweets.find({ 'annotations.detailed.user': { $ne: this.userId } }, { limit: 5 });
  });
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

    Object.keys(annotations).forEach((type) => {
      updateObject.$inc[`annotations.aggregated.${type}.${annotations[type]}`] = 1;
    });

    Tweets.update(tweetId, updateObject);
  },
});
