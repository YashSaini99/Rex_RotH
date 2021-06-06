const { MessageEmbed, Client, Message } = require('discord.js')

module.exports = {
    name: "serverinfo",
    description: "Shows Information about the server",
    catagory: 'info',
    
    botperms: ['EMBED_LINKS'],

    run: async (client, message, args) => {
        const owner = message.guild.ownerID
        const cato = message.guild.channels.cache.filter(ch => ch.type === 'category').size
        const botCount = message.guild.members.cache.filter(m => m.user.bot).size;




        let embed = new MessageEmbed()
            .setColor("#f7f0f0")
            .setTitle(`${message.guild.name}'s Info`)
            .setDescription(` ・**Owner**: ${message.guild.owner} \n **・Region**: \`${message.guild.region}\` \n **・Members**: \`${message.guild.memberCount}\` \n **・Roles**: \`${message.guild.roles.cache.size}\` \n **・Text Channels**: \`${message.guild.channels.cache.size}\` \n **・Verification**: \`${message.guild.verificationLevel}\`\n・**Created on**: \`${message.guild.createdAt.toUTCString()}\``)
            .setThumbnail(message.guild.iconURL())

        message.channel.send(embed);
    }
}