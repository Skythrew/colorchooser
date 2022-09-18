const { DiscordMenus, ButtonBuilder, MenuBuilder } = require('discord-menus');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
let MenusManager = null;

module.exports = {
    name:'colorchoose',
    description: 'Choose a color among your roles colors',
    options: [],
    async execute(interaction) {
        if(MenusManager == null)
            MenusManager = new DiscordMenus(interaction.client);

        let userColors = {};
        interaction.member.roles.cache.each(async (role) => {
            role.guild.roles.cache.each((guildRole) => {
                if(guildRole.name.startsWith('COLOR-')) {
                    if(!role.name.startsWith('COLOR-') && guildRole.name.split('-')[1] == role.id)
                        userColors[role.name] = guildRole;
                }
            })
        });
        //let emojiList = "grinning,grin,joy,rofl,smiley,smile,sweat_smile,laughing,wink,blush,yum,sunglasses,heart_eyes,kissing_heart,smiling_face_with_three_hearts,kissing,kissing_smiling_eyes,kissing_closed_eyes,relaxed,slightly_smiling_face,hugs,star_struck";
        const menu = new MessageSelectMenu().setCustomId('color-choose-' + interaction.user.tag).setPlaceholder('Nothing selected');
        for(const k in userColors){
            let text = k;
            //let text = ':' + emojiList.split(',')[Math.floor(Math.random() * emojiList.split(',').length)] + ': ' + k; 
            menu.addOptions([{label: text, value: (interaction.user.id.toString() + '-' + userColors[k].id.toString())}]);
        }

        const row = new MessageActionRow()
			.addComponents(
				menu
			);
        
        interaction.reply({content: 'Choose your color !', components: [row]});
        
    }
}