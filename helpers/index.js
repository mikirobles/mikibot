const mentionsBot = (message, bot) =>
  message.includes(bot.id) ||
  message.includes("miki");

const says = (message, tag) => {
    if (Array.isArray(tag)) {
        for (let i = 0; i < tag.length; i++) {
            if (message.includes(tag[i])) return true;
        }
        return false;
    }
    return message.includes(tag);
}

module.exports = {
    mentionsBot,
    says
}