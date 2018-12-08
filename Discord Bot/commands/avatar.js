module.exports = {
    name: 'avatar',
    description: 'Sends the sexy avatar png file of the bot.',
    //args: false, // If the command requires arguments set to true. If they're optional(or not needed/ignored) set to false.
    //usage: '',
    //guildOnly: false,
    cooldown: 10,
    aliases: ['icon', 'pfp'],
    execute(message, args) {
        message.channel.send("Here's my sexy profile pic!", { files: ["./guess_what.png"] });
    },
};