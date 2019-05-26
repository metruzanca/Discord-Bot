const Discord = require('discord.js');
module.exports = {
    name: 'embedtext',
    description: 'Sends echoes the formatted embed.',
    //args: true, // If the command requires arguments set to true. If they're optional(or not needed/ignored) set to false.
    //usage: '',
    //guildOnly: false,
    cooldown: 2,
    aliases: ['embed'],
    execute(message, args) {
        message.channel.send(new Discord.RichEmbed({
            "content": ".",
            "embed": {
                "title": "Game Role Assignment",
                "description": "React with each of the games you play on by clicking on the corresponding game icon below.\n<:D2:544262889125707787> for @Destiny 2\n:AnthemRanger: for @Anthem\n:Warframe: for @Warframe\n:ow: for @Overwatch",
                "color": 10027247
            }
        }));
    },
};