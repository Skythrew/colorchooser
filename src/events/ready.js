const root = process.cwd() + '/src';
const commandsDir = 'commands';

const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'ready',
    description: 'When the client is logged in',
    async execute(client) {
        client.customCommands = new Discord.Collection();
        console.log('[INFO] Client logged in as ' + client.user.tag);
        
        // Register commands

        const commandFiles = fs.readdirSync(root + '/' + commandsDir).filter(file => file.endsWith('.js'));

        for(const commandFile of commandFiles) {
            const command = require(root + '/' + commandsDir + '/' + commandFile);
            console.log('[REGISTER] Command: ' + command.name);

            let cmd = await client.application.commands?.create({
                name: command.name,
                description: command.description,
                options: command.options,
                execute: command.execute
            });

            client.customCommands.set(cmd.id, command.execute);
        }
    }
}