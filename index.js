const axios = require('axios');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.telegram_bot_api_key);
const apiRandomURL = process.env.recipe_api_url;
const apiTagsURL = process.env.recipe_api_tags_url;

const getRandomRecipe = async () => {
    // add http headers to the request
    const headers = {
        'x-api-key': process.env.recipe_api_key
    };
    // make the request
    const response = await axios.get(apiRandomURL, { headers });
    return response.data;
}

const getRecipeByTags = async (tags) => {
    // add http headers to the request
    const headers = {
        'x-api-key': process.env.recipe_api_key
    };
    apiTagsURLwithTags = apiTagsURL + tags;
    // make the request
    const response = await axios.get(apiTagsURLwithTags, { headers });
    return response.data;
}

bot.start((ctx) => ctx.reply(`Welcome ${ctx.chat.first_name} \n\nI am a bot.`));

bot.command('random', async (ctx) => {
    const recipe = await getRandomRecipe();
    console.log(recipe);
    console.log(recipe.recipes[0].image);
    await ctx.replyWithPhoto(recipe.recipes[0].image, {
        caption: recipe.recipes[0].title
    });
    const instructions = recipe.recipes[0].instructions.replace(/<[^>]+>/g, '');
    // In the above line, we are using a regular expression to remove all the HTML tags from the instructions
    // /<[^>]+>/g is a regular expression that matches all the HTML tags in the string
    await ctx.reply(instructions);
});

// get tags as input from the user
bot.command('tags', async (ctx) => {
    const tags = ctx.message.text.split(' ').slice(1);
    // the above line will split the message into an array of words and splice(1) will remove the first word (which is the command itself)
    console.log(tags);
    const recipe = await getRecipeByTags(tags);
    console.log(recipe);
    console.log(recipe.recipes[0].image);
    await ctx.replyWithPhoto(recipe.recipes[0].image, {
        caption: recipe.recipes[0].title
    });
    const instructions = recipe.recipes[0].instructions.replace(/<[^>]+>/g, '');
    await ctx.reply(instructions);
});

bot.launch();