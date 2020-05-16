require('dotenv').config();
const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

const helpMessage = `
Say something to me :
/start - start the bot
/help - command reference
`

bot.start((ctx) => {
  Logger(ctx);
  ctx.reply("Hi there, i am echo bot");
  ctx.reply(helpMessage);
});
bot.help((ctx) => {
  Logger(ctx);
  ctx.reply(helpMessage);
});

bot.command("echo", (ctx) => {
  Logger(ctx);
  const input = ctx.message.text;
  const inputArg = input.split("/echo ")[1];
  let replyEchoText = "You said echo";
  if (inputArg) {
    replyEchoText = `You said ${inputArg}`;
  }
  ctx.reply(replyEchoText);
})


// function for log history
function Logger(ctx) {
  // console.log("Someone used your bot");
  console.log(ctx.from.username + "said: " + ctx.message.text);
}

// ================ ============================== ================
// ================         launch the bot         ================
bot.launch();