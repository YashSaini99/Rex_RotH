const { MessageEmbed } = require('discord.js')

module.exports = {

    name: 'nowplaying',
    aliases: ["np"],
    description: 'Shows the current song',

    run : async (client, message, args) => {
        const channel = message.member.voice.channel;
        if (!channel) return message.channel.send('You should join a voice channel before using this command!');
        let queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.channel.send({
            embed: {
                title: 'There is nothing playing right now!'
            }
        })
        message.channel.send({
            embed: {
                title: 'Now Playing',
                description: queue.songs[0].title + ' Requested By: ' + '<@' + queue.songs[0].requester + '>',
                color: '#f7f0f0',
                thumbnail: queue.songs[0].thumbnail
            }
        })
    }
}

