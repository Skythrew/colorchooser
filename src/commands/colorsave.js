module.exports = {
    name:'colorsave',
    description: 'Save color roles',
    options: [],
    async execute(interaction) {
        let currentRoles = await interaction.guild.roles.fetch();
        for(let i = 0; i < currentRoles.size; i++){
            const role = currentRoles.get(currentRoles.keyAt(i));
            if(role.name.startsWith('COLOR-') || role.name.startsWith('COLOR#')){
                currentRoles.each((guildRole) => {
                    if(guildRole.id == role.name.split('-')[1])
                        guildRole.edit({color: role.color});
                })
            }
        }

        currentRoles = await interaction.guild.roles.fetch();
        for(let i = 0; i < currentRoles.size; i++){
            const role = currentRoles.get(currentRoles.keyAt(i));
            if(role.name.startsWith('COLOR-') || role.name.startsWith('COLOR#')){
                await role.delete(); //Notice the await.
            }
        }

        interaction.reply('Save is done :white_check_mark:');
    },
    
}