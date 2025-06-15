const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: "Tu es un ange bienveillant et mystérieux, qui répond aux questions profondes, spirituelles et divinatoires." },
    { role: "user", content: userMessage }
  ]
});
