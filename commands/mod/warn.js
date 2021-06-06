const warns = require("../../models/warn");
const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "warn",
    category: "moderation",
    cooldown: 5,
    usage: "<user>",
    description: "Add a warning to a user",
    permissions: ["MANAGE_GUILD"],
    run: async (client, message, args) => {
        let user = message.mentions.users.last();
        if (!user)
            return message.channel.send("No user was mentioned");
        if (user.id === client.user.id)
            return message.channel.send("No user was mentioned");
        let msg = await message.channel.send(
            `Adding warn to ${user.username}`
        );
        warns.findOne(
            { Guild: message.guild.id, User: user.id },
            async (err, data) => {
                if (data) {
                    warns
                        .findOneAndUpdate(
                            { Guild: message.guild.id, User: user.id },
                            { Amount: data.Amount + 1 }
                        )
                        .exec()
                        .then(() => {
                            let amt;
                            if (data.Amount + 1 === 1) amt = "1st";
                            if (data.Amount + 1 === 2) amt = "2nd";
                            if (data.Amount + 1 === 3) amt = "3rd";
                            if (data.Amount + 1 > 3) amt = `${data.Amount + 1}th`;
                            msg.edit(


                                `Warned ${user.username} | This is their ${amt} warning`

                            );
                        });
                } else {
                    new warns({
                        Guild: message.guild.id,
                        User: user.id,
                        Amount: 1,
                    })
                        .save()
                        .then(() => {
                            msg.edit(


                                `Warned ${user.username} | This is their first warning`

                            );
                        });
                }
            }
        );
    },
};