const Discord = require("discord.js")
const moment = require('moment');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports = {

    name: "whois",
    description: "userinfo",
    category: 'info',
    usage: "m/whois <mention a member/member id>",
    aliases: ['ui', 'userinfo'],

    run: async (bot, message, args) => {
        var permissions = [];
        var acknowledgements = 'None';
        let whoisPermErr = new Discord.MessageEmbed()
            .setTitle("**User Permission Error!**")
            .setDescription("**Sorry, you don't have permissions to use this! ❌**")

        if (!message.channel.permissionsFor(message.author).has("SEND_MESSAGES")) return message.channel.send(whoisPermErr)

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;


        if (member.hasPermission("KICK_MEMBERS")) {
            permissions.push("Kick Members");
        }

        if (member.hasPermission("BAN_MEMBERS")) {
            permissions.push("Ban Members");
        }

        if (member.hasPermission("ADMINISTRATOR")) {
            permissions.push("Administrator");
        }

        if (member.hasPermission("MANAGE_MESSAGES")) {
            permissions.push("Manage Messages");
        }

        if (member.hasPermission("MANAGE_CHANNELS")) {
            permissions.push("Manage Channels");
        }

        if (member.hasPermission("MENTION_EVERYONE")) {
            permissions.push("Mention Everyone");
        }

        if (member.hasPermission("MANAGE_NICKNAMES")) {
            permissions.push("Manage Nicknames");
        }

        if (member.hasPermission("MANAGE_ROLES")) {
            permissions.push("Manage Roles");
        }

        if (member.hasPermission("MANAGE_WEBHOOKS")) {
            permissions.push("Manage Webhooks");
        }

        if (member.hasPermission("MANAGE_EMOJIS")) {
            permissions.push("Manage Emojis");
        }

        if (permissions.length == 0) {
            permissions.push("No Key Permissions Found");
        }

        if (member.user.id == message.guild.ownerID) {
            acknowledgements = 'Server Owner';
        }

        const embed = new Discord.MessageEmbed()

               .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
               .setColor('f7f0f0')
               .setThumbnail(member.user.displayAvatarURL())
               .setDescription(` ・**ID**- \`${member.user.id}\`\n・**Acknowledgements**-\`${acknowledgements}\`\n・**Status** - \`${status[member.user.presence.status]}\`\n・**Joined at**- \`${moment(member.joinedAt).format("dddd, MMMM Do YYYY")}\`\n・**Created On**- \`${member.user.createdAt.toLocaleString()}\``)
               .addField(`・Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}] - `, `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(" **|** ") || "No Roles"}`)
               .addField("・Permissions -  ", `\`${permissions.join(` | `)}\``);
            
        message.channel.send({ embed });

    }
}