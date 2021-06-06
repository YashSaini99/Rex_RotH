const { MessageEmbed } = require("discord.js");

module.exports = {

    name: 'roleinfo',
    category: 'info',
    description: "shows stats of the mentioned role",
    usage: " <role mention/role id>",
    aliases: ['rinfo', 'rolei'],
    
    run: async (bot, message, args) => {
        if (!args[0]) return message.channel.send("**Please Enter A Role!**")
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!role) return message.channel.send("**Please Enter A Valid Role!**");

        const status = {
            false: "No",
            true: "Yes"
        }

        let roleembed = new MessageEmbed()
            .setColor("#f7f0f0")
            .setTitle(`Role Info: \`[  ${role.name}  ]\``)
            .setDescription(` **・ID**- \`${role.id}\`\n**・Hex**- \`${role.hexColor}\`\n**・Members**- \`${role.members.size}\`\n**・Position**- \`${role.position}\`\n**・Mentionable**- \`${status[role.mentionable]}\``)
            .setThumbnail(message.guild.iconURL())
            

        message.channel.send(roleembed);
    }
}