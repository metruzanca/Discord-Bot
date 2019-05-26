const Discord = require('discord.js');
const { prefix, token, version } = require('./botconfig.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const fs = require('fs');
// fs.readdirSync('./commands') returns an array of files names.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Requires all of the command files and sets up the collection (name, command)
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
    console.log('\x1b[1;32m%s\x1b[0m', `╔═════════════╗\n║ Bot Online! ║ - v${version} - \n╚═════════════╝\n`);
});

client.on('message', message => {

    // Separates the commandName and args.
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Gets the command which corresponds to the command.js file to be able to call its properties.
    const command = client.commands.get(commandName)
                 || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return message.reply('Thats not a valid command.');
    
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    // command.args from the command js file and args.length if 0, remember 0 is a falsey value.
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            return message.channel.send(reply);
        }
    }
    
    // Command Cooldowns 
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${prefix}${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => {
        timestamps.delete(message.author.id)
        // TODO: delete the "time left message". Figure out how to get that message so you can delete it after x time.
    }, cooldownAmount);

    console.log(`${message.author.username} : ${message.content}`);

    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('Strange... there was an error trying to execute that command..');
        message.channel.send('I should let my Daddy know about this.. <@84245570583003136>')
    }

   
});

// let stdin = process.openStdin();
// stdin.addListener('data', function (d) {
//     let input = d.toString().trim();
    
// });

require('http').createServer().listen(3000);

client.login(token);