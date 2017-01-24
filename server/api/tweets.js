import { Restivus } from 'meteor/nimble:restivus';
import { Tweets } from '../../imports/api/tweets';
import { getMostFrequentAnnotation } from '../tweet-methods';

// Global API configuration
const Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true,
});

const createTxt = tweets => tweets.map(t => `${t._id} ${getMostFrequentAnnotation(t)}`).join('\n');

// Maps to: /api/tweets
Api.addRoute('tweets', { authRequired: false }, {
  get() {
    const format = this.queryParams.format && this.queryParams.format.toLowerCase();
    const tweets = Tweets
      .find({ annotations: { $exists: true } }, { fields: { _id: 1, 'annotations.aggregated': 1 } })
      .fetch();

    if (format === 'json') {
      return tweets;
    }

    return {
      headers: {
        'Content-Type': 'text/plain',
      },
      body: createTxt(tweets),
    };
  },
});
