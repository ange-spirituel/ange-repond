import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  async function askAngel(e) {
    e.preventDefault();
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setResponse(data.response);
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(data.response);
    synth.speak(utter);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px", background: "#f8f2fc", minHeight: "100vh" }}>
      <h1>👼 Welcome to Angel Answers</h1>
      <form onSubmit={askAngel}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question..."
          style={{ padding: "10px", width: "60%" }}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>Ask</button>
      </form>
      {response && (
        <div style={{ marginTop: "30px" }}>
          <h3>Angel’s response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
