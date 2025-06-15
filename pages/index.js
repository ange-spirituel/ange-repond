import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  async function askAngel(e) {
    e.preventDefault();
    setResponse("⏳ L’ange écoute...");

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();

    if (res.ok) {
      setResponse(data.response);
      // Fait parler l'ange avec une voix douce
const utterance = new SpeechSynthesisUtterance(data.response);
utterance.lang = "fr-FR"; // ou "en-US" selon la langue
utterance.pitch = 1.2; // ton un peu plus haut
utterance.rate = 0.95; // vitesse un peu lente
utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes("Google") || voice.lang === "fr-FR");

speechSynthesis.speak(utterance);

    } else {
      setResponse(`❌ Erreur : ${data.error || "Erreur inconnue."}`);
    }
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>👼 L’Ange Répond</h1>
      <form onSubmit={askAngel}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Pose ta question..."
          style={{ padding: "10px", width: "60%" }}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Demander
        </button>
      </form>

      <div style={{ marginTop: "2rem", fontSize: "18px" }}>
        {response && <p>{response}</p>}
      </div>
    </div>
  );
}
