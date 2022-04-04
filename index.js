import { Client, Intents, MessageEmbed } from "discord.js";
import config from "./config.json" assert { type: "json" };

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once("ready", () => {
  console.log("ready");
});

const exampleEmbed = new MessageEmbed()
  .setColor('#ff0000')
  .setTitle('Testing embeds')
  .setURL('https://www.google.com')
  .setDescription('I HATE MAIL!')
  .setImage('https://i.imgur.com/AfFp7pu.png')

fetch('https://api.twitter.com/2/tweets/search/recent?query=from%3Akuroakuma%20has%3media%20#carriercrowbot', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${config.twitterBearerToken}`
  }
}).then(console.log)

client.on('interactionCreate', async interaction => {
  if(!interaction.isCommand()) return;
  const {commandName} = interaction
  if(commandName === 'ping') await interaction.reply({embeds: [exampleEmbed]})
  if(commandName === 'server') await interaction.reply(`Server info for: ${interaction.guild.name}\nTotal member count: ${interaction.guild.memberCount}`)
  if(commandName === 'user') await interaction.reply(`User info for: ${interaction.user.tag}\n id: ${interaction.user.id}`)
})

client.login(config.token);
