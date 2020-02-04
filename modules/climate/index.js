const Axios = require("axios");

const getEmoji = icon => {
  if (icon.includes("clear-day")) {
    return "☀️ ";
  }
  if (icon.includes("thunderstorm")) {
    return "⛈ ";
  }
  if (icon.includes("partly-cloudy")) {
    return "⛅️ ";
  }
  if (icon.includes("cloudy")) {
    return "☁️ ";
  }
  if (icon.includes("rain")) {
    return "🌧 ";
  }
  if (icon.includes("wind")) {
    return "💨 ";
  }
  return "";
};

const climate = async ({ message }) => {
  if (
    (message.content.includes("miki") && message.content.includes("clima")) ||
    message.content.includes("m!clima")
  ) {
    try {
      const { data } = await Axios.default.get(
        "https://api.darksky.net/forecast/3fce2b1424751388569b1e67e20f073f/-34.4651469,-58.52935839999999?lang=es&units=si"
      );

      return `${getEmoji(data.currently.icon)}${
        data.currently.summary
      } y hace ${Math.round(
        data.currently.temperature
      )} grados en Buenos Aires.`;
    } catch (e) {
      console.log({ e });
      return "Tuve un problemita al traer la info del clima, mil disculpas.";
    }
  }
  return null;
};

module.exports = climate;
