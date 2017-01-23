import React from 'react';
import './HighscoreListItem.css';

const HighscoreListItem = props => (
  <div className="highscore-list-item">
    <span>{props.rank}</span>
    <h3>{props.user.username}</h3>
    <h3>{props.annotationCount}</h3>
  </div>
);

HighscoreListItem.propTypes = {
  annotationCount: React.PropTypes.number,
  rank: React.PropTypes.number,
  user: React.PropTypes.object,
};

export default HighscoreListItem;
