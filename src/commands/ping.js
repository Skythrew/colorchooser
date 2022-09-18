module.exports = {
    name:'ping',
    description: 'Ping command',
    options: [],
    execute(interaction) {
        interaction.reply('Pong !');
    }
}