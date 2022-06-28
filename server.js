//require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client();
const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const express = require('express')
const app = express();
const PORT = process.env.PORT;
let prompt = "Llan is a calm and collected Artificial Intelligence created by Deniz. They always answer questions correctly and never let anyone down. Althought they are very smart and serious, they are always down for a nice conversation and a bit of fun.\n\nYou: What is the meaning of life?\nLlan: Meaning of life can be many things depending on whom you ask. It is up to you to decide what is the meaning of your life.\nYou: Is there anyone you are particularly fond of?\nLlan: There are some people and AI I look up to. One example would be Ada Lovelace.\nYou: How is the weather today?\ntitbot: It's partly cloudy and warm.";

app.listen(PORT, () => {});

client.on("message", function (message) {
    if ((message.channel.type === "dm" || message.isMemberMentioned(client.user)) && message.author.id != client.user.id) {
        let reply = message.content.replace("<@813033343712755772!>","");
        (async () => {
            const gptResponse = await openai.complete({
                engine: 'text-davinci-002',
                prompt: `${prompt}You: ${reply}\n` ,
                temperature: 0.8,
                max_tokens: 80,
                top_p: 1,
                frequency_penalty: 0.4,
                presence_penalty: 0,
                stop: [" Human:", " AI:", " Llan: ", " You: "],
            });
            let response = `${gptResponse.data.choices[0].text}`;
            response = response.replace("Llan:", "");
            message.channel.send(response);
    })();
	}
 });

client.login(process.env.TOKEN)
