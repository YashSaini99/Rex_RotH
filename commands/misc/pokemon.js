const fetch = require('node-fetch');
const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'pokemon',
    description: 'Know Info About Pokemons',
    usage: ' [pokimon name]',
    category: 'Fun',
    guildOnly: true,
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('Enter a pokemon to search for!');

        const pokemon = args[0].toLowerCase();

        await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(res => res.json()).then(res => {
            const data = res;
            const { sprites, name, id, types, abilities } = data;

            let embed = new Discord.MessageEmbed()
                .setColor("f7f0f0")
                .setTitle(`${name.charAt(0).toUpperCase() + name.slice(1)} #${id}`)
                .setThumbnail(`${sprites.front_default}`);
            types.forEach(type => embed.addField('Type', type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1), true));
            abilities.forEach(ability => embed.addField('Ability', ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1), true));
            embed.setFooter(`© ${message.guild.me.displayName}`, `${message.guild.iconURL()}`);

            message.channel.send(embed);
        }).catch(err => {
            console.log(err);
            message.channel.send(`The Pokemon ${pokemon} doesn't exist.`);
        });
    }
}