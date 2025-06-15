export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ange-repond-ze62.vercel.app/",
        "X-Title": "Ange Répond"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: body.messages
      }),
    });

    const data = await response.json();

    if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}
