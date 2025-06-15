export default async function handler(req, res) {
  const { question } = req.body;

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
        model: "gpt-3.5-turbo", // ou "gpt-4" si tu as l'accès
        messages: [
          {
            role: "system",
            content: "Tu es un ange bienveillant et mystérieux qui répond avec sagesse aux humains.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Erreur OpenAI :", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    const message = data.choices?.[0]?.message?.content;
    res.status(200).json({ response: message });
  } catch (error) {
    console.error("Erreur AI:", error);
    res.status(500).json({ error: "Erreur lors de la réponse de l'ange." });
  }
}
