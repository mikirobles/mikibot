const rockPaperSissors = require("./rockPaperSissors");

const interpreter = ({ message }) => {
  if (
    message.content.includes("m!rps") ||
    rockPaperSissors.playerIsPlaying(message.author.username)
  ) {
    return rockPaperSissors.interpreter({ message });
  }
  return null;
};

module.exports = interpreter;
