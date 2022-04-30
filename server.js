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
    if ((message.author.id == 181493692895330304 || message.author.id == 157273960776597504 || message.author.id == 814957326082900019) && (message.channel.type === "dm" || message.isMemberMentioned(client.user))) {
    prompt += `You: ${message.content}\n`;
    (async () => {
        const gptResponse = await openai.complete({
            engine: 'text-davinci-002',
            prompt: prompt,
            maxTokens: 90,
            temperature: 0.87,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0.65,
            stream: false,
            stop: ['AI:']
        });
        gpt = `${gptResponse.data.choices[0].text}`;
        response = gpt.replace("titbot: ", "")
        message.channel.send(response);
        prompt += `${response}\n`;
    })();
	}
 });

client.login(process.env.TOKEN)
