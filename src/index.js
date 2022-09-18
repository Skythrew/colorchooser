// Configure dotenv
require('dotenv').config();

// Initialize constants
const root = process.cwd() + '/src';
const eventsDir = 'events';
const commandsDir = 'commands';

// Initialize Discord.JS and fs module

const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS]});

client.login(process.env.TOKEN);

// Register events
const eventFiles = fs.readdirSync(root + '/' + eventsDir).filter(file => file.endsWith('.js'));

for(const eventFile of eventFiles) {
    const event = require(root + '/' + eventsDir + '/' + eventFile);
    console.log('[REGISTER] Event: ' + event.name);
    if(typeof event.once == 'undefined')
        event.once = false;

    if(event.once)
        client.once(event.name, (...args) => {event.execute(client, ...args)});
    else
        client.on(event.name, (...args) => {event.execute(client, ...args)});
}
