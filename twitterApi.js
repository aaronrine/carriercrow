import config from './config.json' assert {type: "json"};

const baseUrl = 'https://api.twitter.com/2/'
const options = {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + config.twitterBearerToken
  }
}

export async function fetchLatestTweet() {
  const akumaId = '3258190737'
  const query = 'tweet.fields=entities,created_at'
  try {
    const _res = await fetch(
      new URL(`users/${akumaId}/tweets?${query}`, baseUrl),
      options
    )
    // twitter returns the tweets as "data" 
    const {data:tweets} = await _res.json() 
    return tweets.sort((tweetA, tweetB) => 
      new Date(tweetA.created_at).getTime() + new Date(tweetB.created_at).getTime()
    )[0]
  }
  catch(err) {
    console.error(err)
    throw new Error(`Error while fetching in fetchLatestTweet: ${err}`)
  }
}

export default fetchLatestTweet