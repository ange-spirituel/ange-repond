import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAngel = async () => {
    if (!question) return;

    setLoading(true);
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);

    // Faire parler l'ange
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(data.reply);
    utterance.pitch = 1.2;
    utterance.rate = 0.95;
    utterance.lang = 'fr-FR';
    synth.speak(utterance);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>👼 Ange Spirituel</h1>
      <p>Pose ta question à l’ange :</p>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Écris ta question ici"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={askAngel} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
        {loading ? 'Réflexion divine...' : 'Demander à l’ange'}
      </button>

      {response && (
        <div style={{ marginTop: '2rem', backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <strong>Réponse :</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
