require('dotenv').config();
const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// function middleware for log history
bot.use((ctx, next) => {
  // get id use console.log ctx.chat and chat something in a group with a bot;
  // console.log(ctx.chat); ==> you'll find id of the console
  // we'll got id of process.env.GROUP_ID

  if (ctx.updateSubTypes[0] == "text") {
    // console.log(ctx.from.username + " said: " + ctx.message.text);
    bot.telegram.sendMessage(process.env.GROUP_ID, ctx.from.username + " said: " + ctx.message.text);
  } else {
    // console.log(ctx.from.username + " sent: " + ctx.updateSubTypes[0]);
    bot.telegram.sendMessage(process.env.GROUP_ID, ctx.from.username + " sent: " + ctx.updateSubTypes[0]);
  }
  next();
})

const helpMessage = `
Say something to me :
/start - start the bot
/help - command reference
/echo - 'you said echo'
/echo some_message - 'you said some_message'
`

bot.start((ctx) => {
  ctx.reply("Hi there, i am echo bot");
  ctx.reply(helpMessage);
});
bot.help((ctx) => {
  ctx.reply(helpMessage);
});

bot.command("echo", (ctx) => {
  const input = ctx.message.text;
  const inputArg = input.split("/echo ")[1];
  let replyEchoText = "You said echo";
  if (inputArg) {
    replyEchoText = `You said ${inputArg}`;
  }
  ctx.reply(replyEchoText);
})

// ================ ============================== ================
// ================         launch the bot         ================
bot.launch();