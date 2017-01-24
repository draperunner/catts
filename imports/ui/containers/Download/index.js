import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

const Download = () => (
  <div>
    <h1>Download!</h1>
    <h3>Sentiment Annotations</h3>
    <ul>
      <li>
        <a href="/api/tweets">Text</a>
      </li>
      <li>
        <a href="/api/tweets?format=json">JSON</a>
      </li>
    </ul>
  </div>
);

export default createContainer(() => ({
}), Download);
