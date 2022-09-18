module.exports = {
    name:'colorsetup',
    description: 'Setup color roles',
    options: [],
    async execute(interaction) {
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('You have not the permission to do this.');

        let currentRoles = await interaction.guild.roles.fetch();
        for(let i = 0; i < currentRoles.size; i++){
            const role = currentRoles.get(currentRoles.keyAt(i));
            console.log(role);
            if(role.name.startsWith('COLOR-') || role.name.startsWith('COLOR#')){
                await role.delete(); //Notice the await.
            }
        }
        currentRoles = await interaction.guild.roles.fetch();
        console.log(currentRoles);
        for(let i = 0; i < currentRoles.size; i++){
            let role = currentRoles.get(currentRoles.keyAt(i));
            console.log('Proceeding role: ' + role.name);
            if(!role.name.startsWith('COLOR-') && !role.name.startsWith('ColorChooser'))
            {
                    console.log('Starting creation...')
                    await role.guild.roles.create({
                        name: 'COLOR-' + role.id.toString(),
                        color: role.color,
                        reason: 'We need a color role'
                    }).catch(e => {console.log(e)});
                    await role.edit({color: 0});
            }
        }

        interaction.reply('Color setup is done !');
    },
    
}