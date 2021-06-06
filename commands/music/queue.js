const distube = require('distube');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'queue',
    aliases: ['q'],
    description: 'Shows the Song Queue',
    catagory: 'Music',



    run : async (client, message) => {
        const channel = message.member.voice.channel;
        if (!channel) return message.channel.send('You should join a voice channel before using this command!');
        const queue = message.client.queue.get(message.guild.id)
        let status;
        if (!queue) status = 'There is nothing in queue!'
        else status = queue.songs.map(x => '• ' + x.title + ' -Requested by ' + `<@${x.requester.id}>`).join('\n')
        if (!queue) np = status
        else np = queue.songs[0].title
        if (queue) thumbnail = queue.songs[0].thumbnail
        else thumbnail = message.guild.iconURL()
        let embed = new MessageEmbed()
            .setAuthor('Queue' , client.user.displayAvatarURL())
            .setThumbnail(thumbnail)
            .setColor('#f7f0f0')
            .addField('Now Playing', np, true)
            .setDescription(status)
        message.channel.send(embed)
    }

}