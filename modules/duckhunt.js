const helpers = require("../helpers");

const duckhunt = ({ message, bot }) => {
  if (
    message.content.includes("-,..,.-'`'°-,_,.-'`'°") ||
    message.content.includes("-,,.-'`'°-,,.-''`") ||
    message.content.includes("-...-'`'°-,,.-'`'°") ||
    (helpers.mentionsBot(message.content, bot) &&
      message.content.includes("> You unjammed your weapon."))
  ) {
    return "dh!bang";
  }

  if (
    helpers.mentionsBot(message.content, bot) &&
    message.content.includes(
      "> Your weapon just jammed, reload it to unjam it."
    )
  ) {
    return "dh!reload";
  }

  return null;
};

module.exports = duckhunt;
