const { MessageEmbed } = require("discord.js");

module.exports = {

    name: "love",
    aliases: ["affinity"],
    description: "Calculates the love affinity the person has for you.",
    usage: " [@user | user ID]",
    category: "fun",

    run: async (bot, message, args) => {
        let user;

        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]).user;
        } else {
            return message.channel.send('You need to mention someone');
        }

        const love = Math.random() * 100;
		const loveIndex = Math.floor(love / 10);
		const loveLevel = '💖'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);

        const embed = new MessageEmbed()
            .setColor('#ffb6c1')
            .addField(`☁ **${user.username}** loves **${message.author.username}** this much:`,
                `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        return message.channel.send(embed);
    }
};