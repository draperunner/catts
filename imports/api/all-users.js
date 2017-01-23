import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

/**
  *   The point of this is to make users' profile available on the client side.
  *   Only the id, username and profile of users will be exposed.
  */

export const AllUsers = new Mongo.Collection('allUsers');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('allUsers', () => Meteor.users.find({}, { fields: {
    _id: 1,
    username: 1,
    profile: 1,
  } }));
}
