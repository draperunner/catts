/**
 * Returns the most frequent annotation of given type for a tweet.
 * For instance, if a tweet has been annotated as 'positive' by two users and 'negative' by one, this method
 * will return 'positive'.
 */
export const getMostFrequentAnnotation = (tweet, type) => {
  const ann = tweet.annotations.aggregated;
  const t = type || 'sentiment';

  let mostFreqAnn = null;
  let highestFreq = -1;
  Object.keys(ann[t]).forEach((annotation) => {
    if (ann[t][annotation] > highestFreq) {
      mostFreqAnn = annotation;
      highestFreq = ann[t][annotation];
    }
  });

  return mostFreqAnn;
};
