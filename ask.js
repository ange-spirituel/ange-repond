export default async function handler(req, res) {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Missing question." });
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
            content: "You are a benevolent angel who responds wisely in English or French."
          },
          {
            role: "user",
            content: question
          }
        ]
      }),
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;
    res.status(200).json({ response: message });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Angel failed to respond." });
  }
}
