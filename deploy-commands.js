import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import config from "./config.json" assert { type: "json" };

const {clientId, guildId, token} = config

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pings me to make sure I'm not slacking off."),
  new SlashCommandBuilder()
    .setName("link-tweet")
    .setDescription("Grab the latest tweet from Akuroakuma and embed it here."),
].map(command => command.toJSON())

const rest = new REST({version: 9}).setToken(token)
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands})
.then(() => console.log('Successfully registered application commands.'))
.catch(console.error)
