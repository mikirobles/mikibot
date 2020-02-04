require("dotenv").config();

const Discord = require("discord.js");
const getResponseForMessage = require("./modules");

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Logged in as %s - %s\n", client.user.username, client.user.id);
});

client.on("message", message => {
  if (message.author.id === client.user.id) return;

  getResponseForMessage({
    message: {
      ...message,
      content: message.content.toLowerCase()
    },
    bot: client.user
  }).then(response => {
    if (response) {
      message.channel.send(response);
    }
  });
});

// eslint-disable-next-line no-undef
client.login(process.env.BOT_TOKEN);
