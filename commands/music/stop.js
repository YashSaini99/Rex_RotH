module.exports = {
	name: 'stop',
	description: 'Stop command.',
	catagory: 'music',

	run: async (client, message, args) => {
		const channel = message.member.voice.channel;
		if (!channel) return message.channel.send('You should join a voice channel before using this command!');
		let queue = message.client.queue.get(message.guild.id)
		if (!queue) return message.channel.send({
			embed: {
				description: 'There is nothing playing to be stopped!',
				color: '#f7f0f0'
			}
		})
		message.react('✅')
		queue.songs = []
		queue.connection.dispatcher.end('Stopped!')
	}
};