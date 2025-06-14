export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ange-repond.vercel.app/',
        'X-Title': 'Ange Répond'
      },
      body: JSON.stringify({
        model: 'openrouter/openai/gpt-3.5-turbo',
        messages: body.messages
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
  }
}
