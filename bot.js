const { Client, Intents, GuildMember,Guild} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require('dotenv').config()
const dataManager = require('./dataManager');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`${client.guilds.cache.size} guilds`);
    
    discordServers = client.guilds.cache.map(g => g.id)
    discordServers.forEach(element => {
        let serverID = element
        const list = client.guilds.cache.get(serverID); 
        const userList = list.members.cache.map(member => {
            return {
                id: member.user.id,
                name: member.user.username,
                image:`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`
            }
        });
        dataManager.createDB(userList);
    });
});

client.on('message', async message => {
    
    if (message.content === 'ping') {
        await message.reply(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }

    if(message.content == 'raffle'){
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let time = day+'/'+month+'/'+year+' '+hour+':'+minute;
        let serverID = message.guild.id;
        let serverName = message.guild.name;
        const list = client.guilds.cache.get(serverID); 
        const userList = list.members.cache.map(member => {
            return {
                id: member.user.id,
                name: member.user.username,
                image:`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`
            }
        });
        var item = userList[Math.floor(Math.random()*userList.length)];
        dataManager.createWinner(item,time,serverName);
        await message.reply(`🎉Winner is <${'\@'+item.id}>`);
    }

    if (message.content == 'users') {
        let serverID = message.guild.id;
        const list = client.guilds.cache.get(serverID); 
        const userList = list.members.cache.map(member => {
            return {
                id: member.user.id,
                name: member.user.username,
                image:`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`
            }
        });
        dataManager.createDB(userList);
    }
});

client.login(process.env.TOKEN);