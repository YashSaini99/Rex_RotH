const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ["av"],
    description: "Display a user avatar",
    usage: " [@user | user ID]",
    category: "info",

    run: async (bot, message, args) => {
        let user;

        if (message.mentions.users.first()) {
            user = message.mentions.users.first();

        } else if (args[0]) {

            user = message.guild.members.cache.get(args[0]).user;

        } else {
            user = message.author;
        }

        const avatarEmbed = new MessageEmbed()
        .setColor(message.member ? message.member.displayHexColor : '#f7f0f0')
        .setTitle('Avatar');

        const format = user.displayAvatarURL({ dynamic: true }).substr(user.displayAvatarURL({ dynamic: true }).length - 3);
        
        if (format === 'gif') {
            avatarEmbed.setAuthor(`${user.username}#${user.discriminator} (${user.id})`);
            avatarEmbed.setDescription(`[gif](${user.displayAvatarURL({ format: 'gif', size: 2048 })})`);
            avatarEmbed.setImage(user.displayAvatarURL({ format: 'gif', size: 2048 }));
        } else {
            avatarEmbed.setAuthor(`${user.username}#${user.discriminator} (${user.id})`);
            avatarEmbed.setDescription(`[png](${user.displayAvatarURL({ format: 'png', size: 2048 })}) | [jpeg](${user.displayAvatarURL({ format: 'jpg', size: 2048 })}) | [webp](${user.displayAvatarURL({ format: 'webp', size: 2048 })})`);
            avatarEmbed.setImage(user.displayAvatarURL({ format: 'png', size: 2048 }));
        }

        return message.channel.send({ embed: avatarEmbed });
    }
};