const Discord = require("discord.js");
const linereply = require("discord-reply");
const colors = require("colors")
const mongoose = require("mongoose");
const { MessageEmbed } = require('discord.js')
const getprefix = require("./util/getprefix");
const client = new Discord.Client({
  presence: {
    status: "dnd",
    activity: {
      name: `>Help`,
      type: "LISTENING"
    }
  }
});
client.config = require("./config.json");

client.login(client.config.token);

client.on("ready", async () => {
  console.log(`${client.user.tag} is now Online! Prefix: ${client.config.prefix}`);
  await mongoose.connect(
    client.config.mongourl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  );
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose has successfully connected!");
});
// send msg if successfull connection to mongodb
mongoose.connection.on("err", err => {
  console.error(`Mongoose connection error: \n${err.stack}`);
});
// send msg if error on connection
mongoose.connection.on("disconnected", () => {
  console.warn("Mongoose connection lost");
});
//send msg if connection lost to mongodb

require("./logger")(client);
//const logger = require("./logger");
//logger(client)

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client)
})
//=========================================================================================================
client.queue = new Map()
const DisTube = require('distube')
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });

client.distube
  .on('playSong', (message, queue, song) => {
    message.channel.send({
      embed: {
        description: ` ***Playing*** _${song.name}_`,
        color: "88b7f5"
      }
    });
  })
  .on("addSong", (message, queue, song) => {
    message.channel.send({
      embed: {
        description: ` ***Added*** _${song.name}_ , _to the Queue_`,
        color: "88b7f5"
      }
    })
  })
  .on("empty", (message) => {
    message.channel.send({
      embed: {
        description: ` leaving the Voice Channel`,
        color: '88b7f5'
      }
    })
  })
//==========================================================================================================

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./database.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "f7f0f0",
    reaction: "🎉"
  }
});

// We now have a client.giveawaysManager property to manage our giveaways!
client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
  console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
  console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});

//==========================================================================================================

client.on('message', async (message) => {
  if (message.author.bot) return;

  const prefix = await getprefix(message.guild.id);

  if(message.content === '<@788274414260322314>' || message.content === "<@!788274414260322314>"){
    return message.lineReplyNoMention(`My Prefix for ${message.guild.name} is \`${prefix}\``)
  }

  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command)
    command.run(client, message, args);

});

client.on('guildCreate', (guild) => {
  let channelToSend;
  guild.channels.cache.forEach((channel) => {
    if(
      channel.type === 'text' &&
      !channelToSend &&
      channel.permissionsFor(guild.me).has("SEND_MESSAGES")
      ) channelToSend = channel;
  });
  if(!channelToSend) return;
  channelToSend.send(
    new MessageEmbed()
        .setAuthor(`${client.user.username}` , client.user.displayAvatarURL())
        .setDescription(`Thanks for Inviting me , My default Prefix is \`>\` but you can change it by using \`setprefix\` command `)
        .setColor("WHITE")
        .setTimestamp()
  )

})