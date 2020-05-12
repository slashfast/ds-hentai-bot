const danbooruAPI = require('../api/danbooru.js');
const fetcher = require('../api/fetcher.js');
const Discord = require('discord.js');
module.exports = {
  name: 'hentai',
  description: 'Send random pic from Danbooru',
  execute(message, args) {
    fetcher.GET(danbooruAPI).then((URL) => {
      const imgEmbed = new Discord.MessageEmbed()
        .setColor('#00FF7F')
        .setTitle(`Пост #${URL[0].id}`)
        .setURL(`https://danbooru.donmai.us/posts/${URL[0].id}`)
        .attachFiles(['./danbooru-logo.png'])
        .setThumbnail('attachment://danbooru-logo.png')
        .addFields(
          { name: 'Автор', value: URL[0].tag_string_artist, inline: true },
          {
            name: 'Рейтинг',
            value: URL[0].score + (URL[0].up_score - URL[0].down_score),
            inline: true,
          },
          {
            name: 'Дата',
            value: () => {
              timeCalc(URL[0].created_at);
              let formated = `${timeCalc(URL[0].created_at).day}.${
                timeCalc(URL[0].created_at).month
              }.${timeCalc(URL[0].created_at).year}`;
            },
            inline: true,
          }
        )
        .setImage(URL[0].file_url)
        .setFooter(`Теги: ${URL[0].tag_string_general}`);
      message.channel.send(imgEmbed);
    });
  },
};

function timeCalc(rawTime) {
  //example 2009-08-20T22:47:02.453-04:00
  let time = {
    year: rawTime.substr(0, 4),
    month: rawTime.substr(5, 2),
    day: rawTime.substr(8, 2),
    hour: () => {
      let hour = rawTime.substr(8, 2);
      if (hour + 4 === 24) return '00';
      if (hour + 4 > 24) {
        hour -= 24;
        if (hour.length < 2) return '0' + hour;
      }
    },
    minute: rawTime.substr(11, 2),
    second: rawTime.substr(14, 2),
  };
  return time;
}
