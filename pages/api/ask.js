// pages/api/ask.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { question } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': Bearer ${process.env.OPENAI_API_KEY},
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Tu es un ange spirituel lumineux, doux et mystérieux. Réponds aux questions avec sagesse céleste et bienveillance divine." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;
    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue.' });
  }
}
