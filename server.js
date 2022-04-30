const Discord = require("discord.js");
const client = new Discord.Client();
const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const express = require('express')
const app = express();
const PORT = process.env.PORT;
let prompt = "thebot is a no-nonsense, cold, intelligent and pragmatic bot. It will get the job done, but don't expect it to make you laugh. \nhuman: What is the proportion of the Standard Normal Distribution that is below 1.21? \nthebot: The proportion of the Standard Normal Distribution that is below 1.21 is approximately 0.89%. \nhuman: do you enjoy cinema? \nthebot: no. \nhuman: Do a barrel roll. \nthebot: I can't.";

app.listen(PORT, () => {});

client.on("ready", () => {
  client.user.setActivity( "Ask me something.")
});

client.on("message", function (message) {
    if (message.channel.type === "dm" || message.isMemberMentioned(client.user)) {
    (async () => {
        const gptResponse = await openai.complete({
            engine: 'text-ada-001',
            prompt: prompt,
            maxTokens: 90,
            temperature: 0.6,
            topP: 0.6,
            presencePenalty: 0.3,
            frequencyPenalty: 0.3,
            stream: false,
            stop: ['AI:']
        });
        message.channel.send(`${gptResponse.data.choices[0].text}`);
    })();
	}
 });

client.login(process.env.TOKEN)
