const Discord = require('discord.js')
const imdb = require("imdb-api");


module.exports = {
    name: 'movie',
    description: 'Searches for a movie with info',
    usage: ' <movie',
    aliases: ['moviesearch'],
    category: 'misc',
    guildOnly: true,

    run: async (client, message, args) => {
        if (!args.length) {
            return message.channel.send("Please give the name of movie or series");
        }

        const imob = new imdb.Client({ apiKey: "paste ur IMdb Key" }); //You need to paste you imdb api

        let movie = await imob.get({ name: args.join(" ") });

        let embed = new Discord.MessageEmbed()
            .setColor("f7f0f0")
            .setTitle(movie.title)
            .setURL(movie.imdburl)
            .setDescription(movie.plot)
            .setThumbnail(movie.poster)
            .addField("❯ Rate", movie.rating, true)
            .addField("❯ Time", movie.runtime, true)
            .addField("❯ Awards", movie.awards, true)
            .addField("❯ Langueages", movie.languages, true)
            .addField("❯ Genres", movie.genres, true)
            .addField("❯ PG", movie.rated, true)
            .addField("❯ Coutry", movie.country, true)
            .addField("❯ Released", movie.released)
            .setFooter(`Requested By ${message.author.username}`)

        message.channel.send(embed)
    }
}
