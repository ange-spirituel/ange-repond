import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [language, setLanguage] = useState("fr");

  async function askAngel(e) {
    e.preventDefault();
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, language }),
    });
    const data = await res.json();
    setResponse(data.response);
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(data.response);
      utterance.lang = language === "fr" ? "fr-FR" : "en-US";
      speechSynthesis.speak(utterance);
    }
  }

  return (
    <div style={{
      backgroundImage: 'url("/background.jpg")',
      backgroundSize: "cover",
      minHeight: "100vh",
      padding: "50px",
      color: "#fff",
      fontFamily: "serif",
      textAlign: "center",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      backgroundBlendMode: "overlay"
    }}>
      <h1 style={{ fontSize: "2.5em", marginBottom: "20px" }}>👼 Ange Répond</h1>
      <form onSubmit={askAngel}>
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={language === "fr" ? "Pose ta question..." : "Ask your question..."}
          style={{
            padding: "10px",
            width: "60%",
            marginLeft: "10px",
            borderRadius: "10px"
          }}
        />
        <button type="submit" style={{
          marginLeft: "10px",
          padding: "10px 20px",
          borderRadius: "10px",
          backgroundColor: "#f0e6f6",
          border: "none"
        }}>
          {language === "fr" ? "Demander" : "Ask"}
        </button>
      </form>
      {response && (
        <div style={{ marginTop: "30px", backgroundColor: "#ffffffcc", padding: "20px", borderRadius: "15px" }}>
          <h3>👼 {language === "fr" ? "Réponse divine :" : "Divine Answer:"}</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}