const helpers = require("../../helpers");
const db = require("../../db/index");

const { randomIntFromInterval } = helpers;

const setGame = (user, game) => db.write(["games", "rps", user], game);

const getGame = user => db.get(["games", "rps", user]);

const options = {
  rock: "rock",
  paper: "paper",
  scissors: "scissors"
};

const beats = {
  [options.rock]: options.scissors,
  [options.paper]: options.rock,
  [options.scissors]: options.paper
};

const getChoiceFromMessage = msg => {
  for (var i = 0; i < Object.keys(options).length; i++) {
    if (msg.includes(Object.keys(options)[i])) return Object.keys(options)[i];
  }
  return null;
};

const getRandomChoice = () =>
  Object.keys(options)[
    randomIntFromInterval(0, Object.keys(options).length - 1)
  ];

const checkEndGame = game => {
  if (getGame(game.user).score[0] === 3) {
    setGame(game.user, null);
    return "================= \n Ganaste toda la partida capo. Hasta la próxima";
  }
  if (getGame(game.user).score[1] === 3) {
    setGame(game.user, null);
    return "================= \n Perdiste toda la partida capo. Hasta la próxima";
  }
  return null;
};

const getScoreString = game =>
  `Ahora vamos ${getGame(game.user).score[0]}-${getGame(game.user).score[1]}`;

const interpreter = ({ message, bot }) => {
  if (getGame(message.author.username) && message.content.includes("end")) {
    setGame(message.author.username, null);
    return "Ahí te borre la partida, podes volver a arrancar ;)";
  }

  if (!getGame(message.author.username) && message.content.includes("m!rps")) {
    setGame(message.author.username, {
      user: message.author.username,
      status: "pending",
      response: getRandomChoice(),
      score: [0, 0],
      rounds: 0
    });

    return `<@${message.author.id}> Dale, arrancamos 0-0 al mejor de 3. \n Elegí una opción (rock, paper, scissors).`;
  }

  if (
    message.content.includes(options.rock) ||
    message.content.includes(options.paper) ||
    message.content.includes(options.scissors)
  ) {
    const game = getGame(message.author.username);

    if (!game) {
      return `<@${message.author.id}> Capo tenes que arrancar el juego con 'm!rps start'`;
    }

    const userChoice = getChoiceFromMessage(message.content);

    if (game.response === beats[userChoice]) {
      setGame(message.author.username, {
        ...game,
        score: [game.score[0] + 1, game.score[1]],
        rounds: game.rounds + 1,
        response: getRandomChoice()
      });
      return `<@${message.author.id}> \n Ganaste la ronda: Miki tira ${
        game.response
      } y pierde contra tu ${userChoice}. \n ${checkEndGame(game) ||
        getScoreString(game)}`;
    }
    if (userChoice === beats[game.response]) {
      setGame(message.author.username, {
        ...game,
        score: [game.score[0], game.score[1] + 1],
        rounds: game.rounds + 1,
        response: getRandomChoice()
      });
      return `<@${message.author.id}> \n  Perdiste la ronda: Miki tira ${
        game.response
      } y le gana a tu ${userChoice}. \n ${checkEndGame(game) ||
        getScoreString(game)}`;
    }

    setGame(message.author.username, {
      ...game,
      response: getRandomChoice()
    });

    return `<@${message.author.id}> Empate: Miki tira ${game.response} y vos tiraste ${userChoice}. Intentá denuevo.`;
  }
};

const playerIsPlaying = username => {
  return Object.keys(db.get(["games", "rps"])).includes(username);
};

module.exports = { interpreter, playerIsPlaying };
