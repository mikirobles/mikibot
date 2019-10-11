const helpers = require("../../helpers");
const opinions = require("./opinions.json");

const {mentionsBot, says} = helpers;

const getOpinion = message => {
  for (var i = 0; i < opinions.length; i++) {
    if (says(message, opinions[i][0])) {
      return opinions[i][1];
    }
  }
};

const interpreter = ({ message, bot }) => {
  if (message.content.includes("opinas") && mentionsBot(message.content, bot)) {
    return getOpinion(message.content);
  }
  return null;
};

module.exports = interpreter;
