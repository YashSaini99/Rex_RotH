module.exports = {
    name:'tictactoe',
    aliases:['ttt'],
    description:'?ttt @YasH',
    catagory:'fun',

    run : async(client, message, args) => {
        const { tictactoe } = require("reconlx");
    
        if (!message.mentions.users.last()) {
            return message.channel.send(client.main)
        }
    
        if (message.mentions.users.last().id === client.user.id) return message.channel.send(client.main)
    
        var game = new tictactoe({
            message: message,
            player_two: message.mentions.members.first(),
          });
    
    }
}

