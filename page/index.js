
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAngel = async () => {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer);

    // Speech synthesis
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(data.answer);
    utterance.lang = "fr-FR";
    synth.speak(utterance);
  };

  return (
    <div style={{ backgroundImage: 'url(/background.jpg)', padding: 20, color: "#fff" }}>
      <h1>🌟 Bienvenue sur Ange Répond 🌟</h1>
      <blockquote>“Les anges sont les pensées de Dieu envoyées à la Terre.”</blockquote>
      <div className="sacred-message">
        <h2>Prépare ton cœur avant de questionner l’Ange</h2>
        <p>Ferme les yeux, respire profondément.</p>
        <p>Adresse ta demande à Dieu, ton ange gardien ou tes guides.</p>
        <p>Formule ta question à voix haute ou en silence, avec foi et amour.</p>
        <p>Quand tu es prêt(e), écris ta question ci-dessous.</p>
      </div>
      <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Écris ta question ici..." />
      <button onClick={askAngel}>Poser la question</button>
      <p>👼 Réponse de l’Ange : {answer}</p>
    </div>
  );
}
