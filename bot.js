require('dotenv').config();
const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// ================ ============================== ================
// ================       basic command list       ================
// basic command list only have 1 param, it's a function for do something
// example below is function for reply text
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.settings((ctx) => ctx.reply('this is settings'));
// bot.start((ctx) => ctx.reply('Welcome'));


// ================ ============================== ================
// ================    inspect what inside ctx     ================
// what inside ctx actually ?? let's console on /start and take a look
// command this normal text reply and break into small pieces

bot.start((ctx) => {
  console.log(ctx.from);
  console.log(ctx.chat);
  console.log(ctx.message);
  console.log(ctx.updateSubTypes);

  ctx.reply(`Welcome ${ctx.from.first_name}`);
});


// ================ ============================== ================
// ================     create your own command    ================
// https://telegraf.js.org/#/?id=command
// two params on bot.command (string_command, function())
bot.command("coba", (ctx) => {
  ctx.reply(`hi ${ctx.from.first_name}, hello world`);
})

// string command can be put as an array if more than 1 command ==> string/string[]
// more command with same reply
bot.command(["test", "Test", "test1"], (ctx) => {
  ctx.reply(`mihaaaa ${ctx.from.first_name}, hello world`);
})

// ================ ============================== ================
// ================      create listener text.     ================
// https://telegraf.js.org/#/?id=hears
// two params on bot.hears (trigger, function)
// param trigger can be string/string[]/RegEx/RegEx[]/Function
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.hears('cat', (ctx) => ctx.reply('Meooonnggg'));

// you can create a group and added your bot to the group
// and the bot will listen to "hi" or "cat" and react
// but setup your bot to disabled group privaty setting first
// go to botfather ==> type /mybots
// select the bot you want to edit
// go to "bot settings" ==> "group privacy" ==> click "turn off"


// ================ ============================== ================
// ================     listen to update types     ================
// https://telegraf.js.org/#/?id=update-types
bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.on('text', (ctx) => ctx.reply('This is a text type'));


// ================ ============================== ================
// ================     mention, phone, hashtag    ================
// these 3 telegraf api, use 2 params ==> string/string[] and function
// https://telegraf.js.org/#/?id=mention
// https://telegraf.js.org/#/?id=phone
// https://telegraf.js.org/#/?id=hashtag

bot.mention("botfather", (ctx) => {
  ctx.reply(`you are mention fathaa dude, it's a mention method`);
})
bot.phone("+62 877 9871 7612", (ctx) => {
  ctx.reply(`you write a phone number ?, it's a phone method`);
})
bot.hashtag("hashtuk", (ctx) => {
  ctx.reply(`dude, it's a hashtag method`);
})


// ================ ============================== ================
// ================             bot.use            ================
// https://telegraf.js.org/#/?id=use
// bot.use((ctx) => {
//   ctx.reply("you used the bot")
// })


// ================ ============================== ================
// ================         launch the bot         ================
bot.launch();