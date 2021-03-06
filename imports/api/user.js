import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

/**
  * This file contains method for updating a single user
  */

export const User = new Mongo.Collection('user');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('user', () => Meteor.users.find({ _id: this.userId }, { fields: {
    _id: 1,
    username: 1,
    profile: 1,
  } }));
}

Meteor.methods({
  'user.addAnnotation'(tweetId, annotations) {
    check(tweetId, String);
    check(annotations, Object);

    // Make sure the user is logged in before inserting a wishlist
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // Push detailed annotation object
    // Increment aggregated annotation stats for convenience
    const updateObject = {
      $push: { 'profile.annotations.detailed': { tweetId, annotations } },
      $inc: { 'profile.annotations.aggregated.count': 1 },
    };

    Object.keys(annotations).forEach((type) => {
      updateObject.$inc[`profile.annotations.aggregated.${type}.${annotations[type]}`] = 1;
    });

    Meteor.users.update({ _id: this.userId }, updateObject);
  },
});
