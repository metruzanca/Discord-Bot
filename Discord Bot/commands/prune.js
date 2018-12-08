module.exports = {
    name: 'prune',
    description: 'Prunes messages of count 1 to 99.',
    args: true, // If the command requires arguments set to true. If they're optional(or not needed/ignored) set to false.
    usage: '<1-99>',
    guildOnly: true,
    cooldown: 5,
    //aliases: [''],
    execute(message, args) {
        
        const amount = parseInt(args[0]) + 1;
        
        if (isNaN(amount)) {
            return message.reply(`Does "${args[0]}" look like a number to you?`);
        }
        
        else if (amount <= 1 || amount > 100) {
            return message.reply(`'I can only Prune messages between 1 and 99 at a time.`);
        }
        
        message.channel.bulkDelete(amount, false).catch(err => {
            console.error(err);
            message.channel.send(`I couldn't prune any messages for some reason..`);
        });
    },
};


