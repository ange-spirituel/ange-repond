
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  function parlerTexte(texte) {
    const voix = new SpeechSynthesisUtterance(texte);
    voix.lang = "fr-FR";
    voix.pitch = 1.2;
    voix.rate = 0.95;
    speechSynthesis.speak(voix);
  }

  async function askAngel(e) {
    e.preventDefault();
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setResponse(data.response);
    parlerTexte(data.response);
  }

  return (
    <div className="container">
      <h1>👼 Ange Répond</h1>
      <form onSubmit={askAngel}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Pose ta question..."
        />
        <button type="submit">Demander</button>
      </form>
      {response && <div className="response">{response}</div>}
    </div>
  );
}
