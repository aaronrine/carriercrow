import "dotenv/config"
import { Client, Intents } from "discord.js";
import fetchLatestTweet from "./twitterApi.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once("ready", () => {console.log("Ready!")});

client.on('interactionCreate', async (intention) => {
  if(!intention.isCommand()) return;
  if(intention.commandName === 'link-tweet') {
    try {
      const latestTweet = await fetchLatestTweet()
      const url = latestTweet.entities.urls[0].url
      const latestTweetIsTagged = latestTweet.entities.hashtags
        .reduce((prev, current) => prev || current?.tag === 'carriercrowbot', false)
      if(latestTweetIsTagged) await intention.reply(`${url}`)
      else await intention.reply('No posts found! Did you remember to use the tag "carriercrowbot"?')
    } catch (e) {
      await intention.reply('There was a problem connecting to twitter, please try again later.')
    }
  }
  if(intention.commandName === 'ping') await intention.reply('Pong!')
})

client.login(process.env.token);
