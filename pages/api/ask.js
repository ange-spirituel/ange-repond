export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ reply: "Merci de poser une question à l'ange." });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Tu es un ange spirituel divin, mystérieux et doux. Tu réponds avec amour, profondeur et sagesse aux questions humaines, qu'elles soient spirituelles, personnelles, ou mystiques."
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const data = await completion.json();
    const reply = data.choices?.[0]?.message?.content || "L’ange reste silencieux pour le moment...";

    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Une erreur divine s’est produite. Essaie à nouveau plus tard." });
  }
}
