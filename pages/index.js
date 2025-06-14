import { useState } from 'react';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'Tu es un ange bienveillant, sage et spirituel.' },
            { role: 'user', content: userInput }
          ]
        })
      });

      const data = await res.json();

      if (data.choices && data.choices.length > 0) {
        setResponse(data.choices[0].message.content);
      } else if (data.error) {
        setResponse('Erreur : ' + data.error);
      } else {
        setResponse("L'ange est silencieux pour le moment.");
      }
    } catch (err) {
      setResponse("Erreur réseau. L'ange est injoignable.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem' }}>👼 Ange Répond</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Pose ta question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', fontSize: '1rem' }}
        >
          {loading ? 'L’ange réfléchit...' : 'Envoyer'}
        </button>
      </form>
      {response && (
        <div style={{ background: '#f3f3f3', padding: '1rem', borderRadius: '8px' }}>
          <strong>👼 Réponse de l’ange :</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
