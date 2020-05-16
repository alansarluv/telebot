require('dotenv').config();
const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// function middleware for log history
bot.use((ctx, next) => {
  if (ctx.updateSubTypes[0] == "text") {
    console.log(ctx.from.username + " said: " + ctx.message.text);
  } else {
    console.log(ctx.from.username + " sent: " + ctx.updateSubTypes[0]);
  }
  next();
})

const helpMessage = `
Say something to me :
/start - start the bot
/help - command reference
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