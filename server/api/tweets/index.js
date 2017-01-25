import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';
import { Tweets } from '../../../imports/api/tweets';
import { getMostFrequentAnnotation } from '../../tweet-methods';
import { statusesLookup } from './twitter';

// This will only expose tweets that are not annotated by current user
Meteor.publish('tweets', function tweetsPublish() {
  const tweets = Tweets.find({ 'annotations.detailed.user': { $ne: this.userId } }, { limit: 100 });
  const self = this;
  statusesLookup(tweets)
    .then((fullTweets) => {
      if (fullTweets.data.errors) return;

      fullTweets.data.forEach((t) => {
        self.added('tweets', t.id_str, { id_str: t.id_str, text: t.text });
      });
      self.ready();
    });
});

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
