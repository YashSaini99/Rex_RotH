module.exports = {
    name: "hangman",
    catagory: 'fun',
    description: "Play hangman",
    usage: '.handman [#channel] [word]',
    example: '.hangman #games banna',

    run : async(client, message, args) => {
        const {hangman} = require('reconlx')
    
        const channel = message.mentions.channels.first();
    
        if (!channel) return message.channel.send('mention a Channel please!!')
    
        if (!args.slice(1).join(' ')) return message.channel.send('Mention a Word!!')
    
    
        // making hangman
    const hang = new hangman({
        message: message,
        word: args.slice(1).join(" "),
        client: client,
        channelID: message.mentions.channels.first().id,
      });
      
      // starting the game
      hang.start();
    }
}