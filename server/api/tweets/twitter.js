const Twit = require('twit');

const T = new Twit({
  consumer_key: process.env.CATTS_CONSUMER_KEY || '',
  consumer_secret: process.env.CATTS_CONSUMER_SECRET || '',
  app_only_auth: true,
});


export const statusesLookup = (tweets) => {
  const options = {
    id: tweets.map(t => t.id_str).join(','),
    include_entities: false,
    trim_user: true,
  };
  return T.get('statuses/lookup', options);
};
