const warnSchema = require("../../models/warn");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "warnings",
  permissions: ["MANAGE_GUILD"],
  category: "moderation",
  description: "Check the warnings of a member",
  usage: "<user>",
  run: async (client, message, args) => {
    let user = message.mentions.users.first();
    if (!user)
      return message.channel.send("No user was mentioned");
    if (user.id === client.user.id)
      return message.channel.send("No user was mentioned");
    let msg = await message.channel.send("Finding data..");
    warnSchema.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (!data)
          return msg.edit("The user has no warnings");
        msg.edit(
    
          `${user.username} has \`${data.Amount}\` warnings`

        );
      }
    );
  },
};