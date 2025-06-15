export default async function handler(req, res) {
  const { question, lang } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question manquante." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              lang === 'fr'
                ? "Tu es un ange bienveillant et sage qui répond avec poésie en français."
                : "You are a gentle and wise angel who replies poetically in English.",
          },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;
    res.status(200).json({ response: message });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la réponse de l'ange." });
  }
}
