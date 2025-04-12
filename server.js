const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Discord Bot Setup
const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

discordClient.once('ready', () => {
  console.log('Discord bot is online!');
});

discordClient.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (message.content.startsWith('!analyze')) {
    const text = message.content.slice(9).trim();
    if (!text) {
      return message.channel.send('Please provide some text to analyze.');
    }

    try {
      const response = await axios.post('http://localhost:3000/api/analyze', { text });
      const result = response.data;
      message.channel.send(`Analysis result: ${result.analysis}`);
    } catch (error) {
      console.error('Error analyzing text:', error);
      message.channel.send('Sorry, I couldn\'t analyze the text at the moment.');
    }
  }
});

// OpenAI API Setup
const openaiApiKey = process.env.OPENAI_API_KEY;

app.post('/api/analyze', async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Analyze the following text: ${text}`,
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );

    const analysis = response.data.choices[0].text.trim();
    res.json({ analysis });
  } catch (error) {
    console.error('Error analyzing text with OpenAI:', error);
    res.status(500).json({ error: 'Failed to analyze text' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

discordClient.login(process.env.DISCORD_TOKEN);
