import express from "express";
import { Client, Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

let isBotOnline = false;

const token = process.env["BOT_TOKEN"];

const bot = new Client(
    {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
        allowedMentions: {parse : ["roles", "users"]}
    },
    )

bot.on("ready", async () => {
    isBotOnline = true;
    console.log("Hey I am running, give me a cookie!")
})

bot.login(token);

const app = express();

app.get("/", async (req,res) => {
    return res.send("Hello Cookie monster");
})
app.get("/bot", async (req,res) => {
    if(isBotOnline) {
        const channelId = process.env["DISCORD_CHANNEL_ID"];
        const channel = bot.channels.cache.get(channelId)
        const role = process.env["DISCORD_ROLE_ID"];
        await channel.send(`Hey <@&${role}>`);
        return res.send("message is sent to server");
    }
    return res.status(502);
})

app.listen(3000)