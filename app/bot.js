import { Client, IntentsBitField } from "discord.js";
import { clear, append } from "./file.service.js";
import { config } from "dotenv";

config();

const logFilePath = process.env.LOG_FILE_PATH;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.username} is ready`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "dump") {
    clear({ filePath: logFilePath });
    message.reply("Now your shitty diary is clear, mate");
    return;
  }

  const log = `${new Date().toISOString()} | ${message.content}\n`;

  append({
    filePath: logFilePath,
    content: log,
  });
  message.reply("I've written it, mate, everyone will see it");
});

export { client };
