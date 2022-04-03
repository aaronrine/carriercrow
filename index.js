import { Client, Intents } from "discord.js";
import token from "./config.json" assert { type: "json" };

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once("ready", () => {
  console.log("ready");
});

client.login(token.token);
