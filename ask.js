export default async function handler(req, res) {
  const { Configuration, OpenAIApi } = require("openai");
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  const prompt = `Tu es un ange spirituel lumineux. Réponds avec douceur et sagesse à cette question : ${req.body.question}`;

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  res.status(200).json({ answer: completion.data.choices[0].message.content });
  
}export default async function handler(req, res) {
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { question } = req.body;

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Tu es un ange spirituel, doux et bienveillant, qui répond avec sagesse et lumière." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await completion.json();
    const reply = data.choices?.[0]?.message?.content;

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la réponse' });
  }
}
