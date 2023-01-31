const axios = require('axios');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.telegram_bot_api_key);

bot.start((ctx) => ctx.reply(`Welcome ${ctx.chat.first_name} \n\nI am a bot.`));

bot.launch();