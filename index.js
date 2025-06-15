import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [lang, setLang] = useState('fr');

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
    speechSynthesis.speak(utterance);
  };

  async function askAngel(e) {
    e.preventDefault();
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, lang }),
    });
    const data = await res.json();
    setResponse(data.response);
    speak(data.response);
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', background: 'linear-gradient(to bottom, #f8f9fa, #e3e4f3)', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#7f5af0' }}>👼 Ange Répond</h1>
      <select value={lang} onChange={e => setLang(e.target.value)} style={{ marginBottom: '1rem' }}>
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
      <form onSubmit={askAngel}>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Pose ta question..."
          style={{ padding: '10px', width: '60%' }}
        />
        <button type="submit" style={{ marginLeft: '10px' }}>Demander</button>
      </form>
      {response && (
        <div style={{ marginTop: '30px' }}>
          <h3>Réponse divine :</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
