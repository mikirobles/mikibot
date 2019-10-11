const insultsData = require("./insults.json");
const helpers = require("../../helpers");

const { insults, tastelessInsults, comebacks } = insultsData;

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getComeback = user => {
  console.log(user);
  if (user === "Lucía") {
    return `peruana`;
  }

  if (user === "Veke") {
    return 'negra tóxica'
  }

  if (user === "miki") {
    return 'mi rey';
  }

  return comebacks[randomIntFromInterval(0, comebacks.length - 1)];
};

const interpreter = ({ message, bot }) => {

  const mentionsBot = helpers.mentionsBot(message.content, bot)

  if (mentionsBot && insults.some(insult => message.content.includes(insult))) {
    const insult = insults.find(insult => message.content.includes(insult));
    return `<@${message.author.id}> A quien llamás ${insult}, ${getComeback(message.author.username)}?`;
  }

  const tastelessInsult = tastelessInsults.find(insult =>
    message.content.includes(insult)
  );
  if (tastelessInsult) {
    return `<@${message.author.id}> Che capo te zarpaste, como vas a usar la palabra ${tastelessInsult}? Me parece muy feo eh, muy feo...`;
  }

  return null;
};

module.exports = interpreter;
