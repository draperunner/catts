import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

const Guidelines = () => (
  <div className="row">
    <div className="col-xs-12">
      <h1>Guidelines</h1>

      <p>
        Determining the correct annotations is not always straight forward. Please refer to these guidelines
        if you are unsure.
      </p>

      <p>
        A <b>positive</b> tweet is a tweet that holds a positive opinion towards something or expresses
        a positive feeling. For instance: "I love my iPhone!"
      </p>
      <p>
        A <b>negative</b> tweet is a tweet that holds a negative opinion towards something. For instance:
        "I am soooo disappointed!"
      </p>
      <p>
         A <b>neutral</b> tweet is a tweet that seems like it could be written on Wikipedia or in a newspaper,
         even though the content might be positive or negative. Here is an example:
        "Fed's Bullard: 5% Jobbless Rate Is Close To Full Employment."
      </p>

    </div>
  </div>
);

export default createContainer(() => ({
}), Guidelines);
