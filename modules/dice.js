const helpers = require("../helpers");

const { mentionsBot } = helpers;

function dice({ message, bot }) {
  if (
    mentionsBot(message.content, bot) &&
    (message.content.includes(" dado") || message.content.includes(" roll"))
  ) {
    let lengthMatch = message.content.match(/ (\d{1,3})/);
    const diceMax =
      (lengthMatch && lengthMatch[0] && Number(lengthMatch[0].slice(1))) || 8;

    return `\`\`\`  ____\r\n \/\\' .\\    _____\r\n\/: \\___\\  \/ .  \/\\\r\n\\' \/ . \/ \/____\/..\\   ${
      message.author.username
    } tiró un ${Math.floor(Math.random() * diceMax) +
      1}\r\n \\\/___\/  \\'  '\\  \/\r\n          \\'__'\\\/\`\`\``;
  }
}

module.exports = dice;
