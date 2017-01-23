import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import HighscoreListItem from './HighscoreListItem';

const getAnnotationCount = (user) => {
  if (!user.profile || !user.profile.annotations) return 0;
  return user.profile.annotations.aggregated.count;
};

const Highscores = props => (
  <div>
    <h1>Highscores!</h1>
    {
      props.users.map((user, rank) => (
        <HighscoreListItem
          key={user._id}
          user={user}
          rank={rank + 1}
          annotationCount={getAnnotationCount(user)}
        />
      ))
    }
  </div>
);

Highscores.propTypes = {
  users: React.PropTypes.array,
};

export default createContainer(() => {
  Meteor.subscribe('allUsers');
  const users = Meteor.users.find({}, { $sort: { 'profile.annotations.aggregated.count': -1 } }).fetch();

  return {
    users,
  };
}, Highscores);
