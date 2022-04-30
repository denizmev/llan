//require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client();
const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const express = require('express')
const app = express();
const PORT = process.env.PORT;
let prompt = "thebot is a no-nonsense, cold, intelligent and pragmatic bot. It will get the job done, but don't expect it to make you laugh. \nhuman: do you enjoy cinema? \nthebot: no. \nhuman: Do a barrel roll. \nthebot: I can't.";

app.listen(PORT, () => {});

client.on("ready", () => {
  client.user.setActivity( "Ask me something!")
});

client.on("message", function (message) {
    if ((message.channel.type === "dm" || message.isMemberMentioned(client.user)) && message.author.id != client.user.id) {
        (async () => {
            const gptResponse = await openai.complete({
                engine: 'text-ada-001',
                prompt: prompt + `Human: ${message.content}\n` ,
                temperature: 0.8,
                max_tokens: 90,
                top_p: 0.8,
                frequency_penalty: 0.6,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"],
            });
            gpt = `${gptResponse.data.choices[0].text}`;
            reply = gpt.replace("thebot:", "")
            message.channel.send(reply);
    })();
	}
 });

client.login(process.env.TOKEN)
