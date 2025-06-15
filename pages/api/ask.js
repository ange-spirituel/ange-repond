export default async function handler(req, res) {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "❌ Question manquante." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Tu es un ange mystérieux et bienveillant, tu réponds avec sagesse.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Erreur OpenAI:", data);
      return res.status(500).json({ error: data.error?.message || "Erreur de l’IA." });
    }

    const message = data.choices?.[0]?.message?.content;
    return res.status(200).json({ response: message });
  } catch (error) {
    console.error("❌ Erreur serveur:", error);
    return res.status(500).json({ error: "Erreur serveur inconnue." });
  }
}
