const { MessageEmbed } = require("discord.js")
const getprefix = require("../../util/getprefix");

module.exports={
    name:'stats',
    aliases:['botinfo,botstats'],
    description:'shows Bot information',

    run : async(client,message,args) => {

        const prefix = await getprefix(message.guild.id);
        const embed = new MessageEmbed()
            .setColor('f7f0f0')
            .setAuthor(`${client.user.username}` , client.user.displayAvatarURL())
            .setDescription(`<:rex_dev:841191759899656212> **Creater**- ! Yash99#1151\n<:rex_info:848086739175866398> **Discord.js**- v12\n\n**Default Prefix**- >\n**Server Prefix**- ${prefix}\n\n**Total Server**- ${client.guilds.cache.size}\n**Support Server**- [Click Here to join Support Server](https://discord.gg/eJEBv7mRuJ)`)

        message.channel.send(embed)
    }
}