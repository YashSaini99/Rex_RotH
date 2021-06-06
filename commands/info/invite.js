const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "invite",
	aliases: ["add"],
    category: "🤖 Information Commands",
    description: "Invite the Bot to your Server",
    
    run: async (client, message, args) => {
        let inviteembed = new Discord.MessageEmbed()
        .setColor("#f7f0f0").setFooter(client.user.username, config.AVATARURL)
        .setTitle("Invite Me")
        .setDescription(`[ INVITE ME NOW](https://discord.com/api/oauth2/authorize?client_id=788274414260322314&permissions=8&scope=bot%20applications.commands)`)
        .setFooter(client.user.username, config.AVATARURL)
        
        message.reply(inviteembed);
    }
}