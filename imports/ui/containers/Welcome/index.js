import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const Welcome = () => (
  <div className="row">
    <div className="col-xs-12">
      <h1>Welcome!</h1>
      <p>
        CATTS is an abbrevation for Crowdsourced Annotation Tool for Twitter Sentiment. Its goal is to generate
        a manually annotated dataset for use in Twitter classification tasks, like sentiment or sarcasm classification.
        By using CATTS, you contribute to research in the fields of Natural Language Processing and Artificial
        Intelligence.
      </p>
      <p>
        As tweets are annotated, the data set is instantly updated and available for download on
        the <Link to="/download">Download</Link> page. Both text and JSON formats are available.
      </p>
      <p>
        Please see the <Link to="/guidelines">Guidelines</Link> page for instructions on how to annotate the tweets.
      </p>
      <Link to="/annotate"><RaisedButton primary label="Start Annotation" /></Link>
    </div>
  </div>
  );

Welcome.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => ({
  currentUser: Meteor.user(),
}), Welcome);
