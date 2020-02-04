const counting = ({ message }) => {
  if (message.channel.id === "622478452741636106") {
    if (message.author.username === "miki") return;

    if (message.content.includes("ruined it")) {
      return message.channel.send("Toma come por gil");
    }

    const number =
      String(Number(message.content.split(" ")[0])) ===
        message.content.split(" ")[0] && Number(message.content.split(" ")[0]);
    // if (number && Math.random() > 0.5) {
    setTimeout(() => {
      message.channel
        .send(`${number + 1}`)
        .then(message => message.react("✅"));
    }, 1500);
    // } else if (number && Math.random() > 0.25) {
    //   setTimeout(() => {
    //     message.channel.send(
    //       `${number + 1} el próximo numero es ${number + 2}, no la cagues`
    //     );
    //   }, 1500);
    // }
  }
  return null;
};

module.exports = counting;
