module.exports = {
    name:'colorsetup',
    description: 'Setup color roles',
    options: [],
    async execute(interaction) {
        let currentRoles = await interaction.guild.roles.fetch();
        for(let i = 0; i < currentRoles.size; i++){
            const role = currentRoles.get(currentRoles.keyAt(i));
            if(role.name.startsWith('COLOR-') || role.name.startsWith('COLOR#')){
                await role.delete(); //Notice the await.
            }
        }

        currentRoles = await interaction.guild.roles.fetch();
        for(let i = 0; i < currentRoles.size; i++){
            let role = currentRoles.get(currentRoles.keyAt(i));
            if(role.name.startsWith('COLOR-') || role.name.startsWith('ColorChooser'))
                continue;
            await role.guild.roles.create({
                name: 'COLOR-' + role.id,
                color: role.color,
                reason: 'We need a color role'
            });
            await role.edit({color: null});
        }

        interaction.reply('Setup is done :white_check_mark:');
    },
    
}