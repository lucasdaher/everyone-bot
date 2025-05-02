require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TARGET_CHANNEL_ID = process.env.CHANNEL_ID;

client.on("ready", () => {
  console.log(`🤖 Bot logado como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.channel.id !== TARGET_CHANNEL_ID) return;

  const isFromWebhook = !!message.webhookId;
  const isFromUser = !message.author.bot;

  if (isFromUser || isFromWebhook) {
    try {
      await message.channel.send("@everyone");
    } catch (error) {
      console.error("Erro ao enviar @everyone:", error);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
