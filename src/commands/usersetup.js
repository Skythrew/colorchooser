module.exports = {
    name:'usersetup',
    description: 'Setup user color roles',
    options: [],
    async execute(interaction) {
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('You have not the permission to do this.')
        
        let currentUsers = await interaction.guild.members.fetch();
        let guildRoles = await interaction.guild.roles.fetch();
        for(let i = 0; i < currentUsers.size; i++){
            const member = currentUsers.get(currentUsers.keyAt(i));
            let role = await guildRoles.find(r => r.name === 'COLOR-' + member.roles.highest.id);
            if(typeof role != 'undefined')
                await member.roles.add(role.id);
        }

        interaction.reply('User setup is done !')
    },
    
}