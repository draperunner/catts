import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tweets = new Mongo.Collection('tweets');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tweets', () => Tweets.find());
}
