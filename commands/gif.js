const giphyAPI = require('../api/giphy.js');
const fetcher = require('../api/fetcher.js');
const Discord = require('discord.js');
module.exports = {
  name: 'gif',
  description: 'Send random gif',
  execute(message, args) {
    fetcher.GET(giphyAPI).then((URL) => {
      const gifEmbed = new Discord.MessageEmbed()
        .setColor('#00FF7F')
        .setImage(URL.data.image_original_url);
      message.channel.send(gifEmbed);
    });
  },
};
