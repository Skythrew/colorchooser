module.exports = {
    name: 'interactionCreate',
    description: 'When a slash command is entered',
    once: false,
    async execute(client, interaction){
        if(interaction.type == 'APPLICATION_COMMAND') 
            client.customCommands.get(interaction.commandId)(interaction);
        else if(interaction.isSelectMenu()) {
            if(interaction.user.id == interaction.values[0].split('-')[0]) {
                const member = await interaction.member.fetch();
                const memberRoles = member.roles.cache
                for(let i = 0; i < memberRoles.size; i++){
                    const role = memberRoles.get(memberRoles.keyAt(i));
                    if(role.name.startsWith('COLOR-')){
                        await member.roles.remove(role); //Notice the await.
                    }
                }
                const role = await interaction.guild.roles.fetch(interaction.values[0].split('-')[1]);
                interaction.member.roles.add(role);

                interaction.reply('You have chosen a good color :sunglasses:');
            }
        }
    }
}