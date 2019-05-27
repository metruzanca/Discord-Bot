const Discord = require('discord.js');
module.exports = {
    name: 'videochat',
    description: 'Replies with the videochat link',
    //args: true, // If the command requires arguments set to true. If they're optional(or not needed/ignored) set to false.
    //usage: '',
    guildOnly: true,
    cooldown: 5,
    aliases: ['video', 'ss', 'screenshare'],
    execute(msg, args) {
        if (msg.member.voiceChannel) {
            msg.delete().then(msg =>{
                msg.reply(`https://www.discordapp.com/channels/${msg.guild.id}/${msg.member.voiceChannel.id}`);
            }).catch(err => console.log(err))
        } else{
            msg.delete().then(msg =>{
                msg.reply(`You need to be in a voice channel to use this command.`)
            }).catch(err => console.log(err))
        }
    },
};