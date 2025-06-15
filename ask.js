export default async function handler(req, res) {
  const { question, language } = req.body;

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
            content: language === "fr"
              ? "Tu es un ange bienveillant qui répond en français avec sagesse et douceur."
              : "You are a benevolent angel who answers in English with wisdom and kindness."
          },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;
    res.status(200).json({ response: message });
  } catch (error) {
    console.error("Erreur AI:", error);
    res.status(500).json({ error: "Erreur lors de la réponse de l'ange." });
  }
}