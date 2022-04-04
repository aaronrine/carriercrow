import { Client, Intents } from "discord.js";
import config from "./config.json" assert { type: "json" };
import fetchLatestTweet from "./twitterApi";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once("ready", () => {console.log("Ready!")});

client.on('interactionCreate', async ({commandName, reply, isCommand}) => {
  if(!isCommand()) return;
  if(commandName === 'link-tweet') {
    try {
      const latestTweet = await fetchLatestTweet()
      const url = latestTweet.entities.urls[0].url
      const latestTweetIsTagged = latestTweet.entities.hashtags
        .reduce((prev, current) => prev || current?.tag === 'carriercrowbot', false)
      if(latestTweetIsTagged) await reply(`${url}`)
      else await reply('No posts found!')
    } catch (e) {
      await reply('There was a problem connecting to twitter, please try again later.')
    }
  }
  if(commandName === 'ping') await reply('Pong!')
})

client.login(config.token);
