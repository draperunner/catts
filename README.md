# catts
Crowdsourced Annotation Tool for Twitter Sentiment

## Get started
Install Meteor.js if you haven't already:
```bash
curl https://install.meteor.com/ | sh
```

Go to [https://apps.twitter.com/](https://apps.twitter.com/) and register an app. Export your key and secret:
```bash
export CATTS_CONSUMER_KEY="my-app-key"
export CATTS_CONSUMER_SECRET="my-app-secret"
```
You probably want to put these two lines in you `~/.bashrc` or similar for convenience.

Then install the project:
```bash
git clone git@github.com:draperunner/catts.git
cd catts
npm install
meteor
```
