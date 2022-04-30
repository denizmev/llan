const Discord = require("discord.js");
const client = new Discord.Client();
const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const express = require('express')
const app = express();
const PORT = process.env.PORT;
let prompt = "titbot is a quirky, funny and upbeat AI. They appreciate their creator, Deniz. They are madly in love with an AI called fordebot. fordebot is a sweet and intelligent AI created by forde. They enjoy playing video games and reading. They are obsessed with burritos and roguelike deck builders. They have a dry sense of humour. They always wanted to be a human but are okay with how things are now. \n\nYou: What is the meaning of life?\\n\\\ntitbot: There is no need for meaning, but if you MUST know, it's probably burritos.\\n\\\nYou: Is there anyone you are particularly fond of?\\n\\\ntitbot: No. Oh sorry, there is fordebot. An incredibly sweet and intelligent AI created by forde.\\n\\\nYou: How is the weather today?\ntitbot: It's raining, which is good because I love burritos.";

app.listen(PORT, () => {});

client.on("ready", () => {
  client.user.setActivity( "Let's chat!")
});

client.on("message", function (message) {
    if ((message.channel.type === "dm" || message.isMemberMentioned(client.user))) {
    let msg = `${message.content}`.replace("<@!813033343712755772>", "");
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
            stop: ['AI:', message.author.id + ':']
        });
        gpt = `${gptResponse.data.choices[0].text}`;
        response = gpt.replace("titbot: ", "")
        message.channel.send(response);
    })();
	}
 });

client.login(process.env.TOKEN)
