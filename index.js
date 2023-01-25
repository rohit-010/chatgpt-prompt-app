const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: 'org-id-from-chat-gpt-website',
  apiKey: 'api-key-from-chat-gpt-website',
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

// prompt: `Pretend you are Steve Jobs. Answer with motivational content.
// Steve: How can I help you today?
// Person: I want some motivation.
// Steve: You are amazing, you can create any type of business you want.
// Person:${message}?
// Steve:`,

app.post('/', async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `You are a console terminal, answer as if you are receiving commands from a user.
    > ${message}?
    #`,
    max_tokens: 20,
    temperature: 0,
  });
  console.log(response.data);
  if (response.data) {
    if (response.data.choices) {
      res.json({
        message: response.data.choices[0].text,
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on ${port}`);
});
