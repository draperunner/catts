import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';
import { Tweets } from '../../../imports/api/tweets';
import { getMostFrequentAnnotation } from '../../tweet-methods';
import { statusesLookup } from './twitter';

// This will only expose tweets that are not annotated by current user
Meteor.publish('tweets', function tweetsPublish() {
  const tweets = Tweets.find({ 'annotations.detailed.user': { $ne: this.userId } }, { limit: 40 });
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

/**
 * Creates a TSV-formatted string from an array of tweets and an annotation type.
 * Each line will contain a tweet's id and its most frequent annotation of the given type
 * @param  {string[]} tweets An array of tweet ids to fetch annotations for
 * @param  {string} type   The annotation type. For instance 'sentiment' or 'sarcasm'
 * @return {string}        A string representing the whole TSV-formatted file
 */
const createTxt = (tweets, type) => tweets
    .map(t => `${t.id_str}\t${getMostFrequentAnnotation(t, type)}`)
    .filter(line => line.slice(line.length - 4) !== 'null')
    .join('\n');

// Maps to: /api/tweets
Api.addRoute('tweets', { authRequired: false }, {
  get() {
    const format = this.queryParams.format && this.queryParams.format.toLowerCase();
    const type = this.queryParams.type && this.queryParams.type.toLowerCase();
    const tweets = Tweets
      .find({ annotations: { $exists: true } }, { fields: { id_str: 1, 'annotations.aggregated': 1 } })
      .fetch();

    if (format === 'json') {
      return tweets;
    }

    return {
      headers: {
        'Content-Type': 'text/plain',
      },
      body: createTxt(tweets, type),
    };
  },
});
