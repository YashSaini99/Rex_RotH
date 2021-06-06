const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
    name: 'lyrics',
    aliases: ['ly'],
    description: 'shows the lyrics of a song',

    run : async (client, message, args) => {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send("There is nothing playing.").catch(console.error);

        let lyrics = null;

        try {
            lyrics = await lyricsFinder(queue.songs[0].title, "");
            if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title} :(`;
        } catch (error) {
            lyrics = `No lyrics found for ${queue.songs[0].title} :(`;
        }

        let lyricsEmbed = new MessageEmbed()
            .setTitle(`Lyrics For ${queue.songs[0].title}`)
            .setDescription(lyrics)
            .setColor("#f7f0f0")
            .setTimestamp();

        if (lyricsEmbed.description.length >= 2048)
            lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
        return message.channel.send(lyricsEmbed).catch(console.error);
    }
}