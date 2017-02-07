import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import FlatButton from 'material-ui/FlatButton';

const Download = () => (
  <div className="container">
    <div className="row">
      <h1>Download</h1>
    </div>
    <div className="row">
      <div className="col-xs-12">
        <p>
          Here you can download annotated tweets of the type you want. The text files are in TSV (Tab Separated Values)
          format, where the first column contains the tweet ids, and the second column their annotations.
        </p>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12 col-md-6">
        <h4>Sentiment Annotations</h4>
        <a href="/api/tweets"><FlatButton label="Text" /></a>
        <a href="/api/tweets?format=json"><FlatButton label="JSON" /></a>
      </div>
      <div className="col-xs-12 col-md-6">
        <h4>Sarcasm Annotations</h4>
        <a href="/api/tweets?type=sarcasm"><FlatButton label="Text" /></a>
        <a href="/api/tweets?type=sarcasm&format=json"><FlatButton label="JSON" /></a>
      </div>
    </div>
  </div>
);

export default createContainer(() => ({
}), Download);
