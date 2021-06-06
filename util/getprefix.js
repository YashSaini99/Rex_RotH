
const prefix = require("../models/prefixmodel");

const getprefix = async (guildID) => {
  const result = await prefix.findOne({
    guildID: guildID,
  });

  if (result) {
    return result.prefix;
  } else if (!result) {
    return ">";
  }
};

module.exports = getprefix;