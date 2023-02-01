const axios = require('axios');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.telegram_bot_api_key);
const apiURL = process.env.recipe_api_url;

const getRandomRecipe = async () => {
    // add http headers to the request
    const headers = {
        'x-api-key': process.env.recipe_api_key
    };
    // make the request
    const response = await axios.get(apiURL, { headers });
    return response.data;
}

bot.start((ctx) => ctx.reply(`Welcome ${ctx.chat.first_name} \n\nI am a bot.`));

bot.command('random', async (ctx) => {
    const recipe = await getRandomRecipe();
    console.log(recipe);
    console.log(recipe.recipes[0].image);
    ctx.replyWithPhoto(recipe.recipes[0].image, {
        caption: recipe.recipes[0].title
    })
});

bot.launch();