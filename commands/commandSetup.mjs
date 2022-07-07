import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";
dotenv.config();
const clientId = process.env["DISCORD_CLIENT_ID"];
const guildId = process.env["DISCORD_GUILD_ID"];
const token = process.env["BOT_TOKEN"];

const commandSetup = async () => {
    const commands = [
        new SlashCommandBuilder().setName("hello").setDescription("responds with Hi!"),
        new SlashCommandBuilder().setName("name").setDescription("responds with bot name"),
    ]
        .map(command => command.toJSON());

    const rest = new REST({ version: '9' }).setToken(token);
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body : commands })
        .then(()=>console.log("Commands well received"))
        .catch(console.error);
}

export { commandSetup };