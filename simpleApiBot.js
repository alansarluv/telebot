require('dotenv').config();
const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

/* 
  reference : http://yerkee.com/api
  Cat As A Service API : https://cataas.com
*/
const axios = require('axios');

// fortune
bot.command('fortune', (ctx) => {
  axios.get('http://yerkee.com/api/fortune')
    .then(res => {
      ctx.reply(res.data.fortune);
    })
    .catch(e => {
      console.log(e);
    })
})

// cat
bot.command('cat', async (ctx) => {
  let input = ctx.message.text;
  let inputArray = input.split(" ");

  if (inputArray.length == 1) {
    try{
      let res = await axios.get("https://aws.random.cat/meow");
      ctx.replyWithPhoto(res.data.file);
    }catch(e){
      console.log(e);
    }
  } else {
    inputArray.shift();
    input = inputArray.join(" ");
    ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`);
  }
})


bot.launch();