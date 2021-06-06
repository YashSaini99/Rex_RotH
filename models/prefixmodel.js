const { Schema, model } = require("mongoose");

const PrefixSchema = new Schema({
  guildID: { required: true, type: String },
  prefix: { required: true, type: String },
});

module.exports = model("Prefix", PrefixSchema);