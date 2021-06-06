const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "ban",
    category: "⛔️ Moderation Commands",
    description: "bans a mentioned user",
    usage: " <@USER> [REASON]",
    run: async (client, message, args) => {
        if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.reply(`**${message.author.username}**, you dont have the missing permissions!`)

        let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        console.log(banMember)

        if (!banMember) return message.reply(`**${message.author.username}**, please tag a user to ban them!`)
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason"

        if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.reply("I dont have the permissions to ban users!")

        let Sembed = new Discord.MessageEmbed()
            .setColor("f7f0f0")
            .setDescription(`You've been banned from ${message.guild.name} because of \`${reason}.\``)
        let i = 0;
        banMember.send(Sembed).catch(err => console.log(err.toString().red))
        banMember.ban(banMember, reason).catch(err => {
            console.log(err.toString().red)
            i++
        }).then(
            () => {
                let embed = new Discord.MessageEmbed()
                    .setColor("f7f0f0")
                    .setDescription(`<:rex_succes:840114767549300766> ***${banMember.user.tag} Successfully Banned!***`)
                if (i == 1)
                    return message.reply("MISSING PERMISSIONS TO BAN HIM!")
                message.reply(embed).then(msg => {
                    msg.delete({ timeout: 10000 });
                })
            }
        )



    }
}