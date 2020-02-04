const insults = require("./insults");
const opinion = require("./opinion");
const counting = require("./counting");
const games = require("./games");
const duckhunt = require("./duckhunt");
const climate = require("./climate");
const dice = require("./dice");

const pipe = [
  insults,
  games,
  // counting,
  climate,
  duckhunt,
  opinion,
  dice
];

const getResponseForMessage = async ({ message, bot }) => {
  const responses = [];

  for (let i = 0; i < pipe.length; i++) {
    const mod = pipe[i];
    try {
      if (typeof mod !== "function") {
        console.error(`mod at index ${i} is not a function`);
      }
      const response = await mod({ message, bot });
      if (Array.isArray(response)) {
        response.forEach(r => responses.push(r));
      } else if (response) responses.push(response);
    } catch (e) {
      console.log(e);
    }
  }
  if (responses.length) {
    return responses.join("\n");
  }
};

module.exports = getResponseForMessage;
