
import { useState, useEffect } from 'react'

export default function Home() {
  const [step, setStep] = useState(0)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (step === 0) {
      setTimeout(() => setStep(1), 5000)
    }
  }, [step])

  const askAngel = async () => {
    if (!question) return
    setLoading(true)
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    })
    const data = await res.json()
    setAnswer(data.reply)
    const utterance = new SpeechSynthesisUtterance(data.reply)
    utterance.lang = "fr-FR"
    speechSynthesis.speak(utterance)
    setLoading(false)
  }

  return (
    <main style={{ background: "url('/background.jpg') no-repeat center center fixed", backgroundSize: "cover", color: "#fff", minHeight: "100vh", padding: "2rem" }}>
      {step === 0 && (
        <div className="intro">
          <h1 className="text-2xl font-bold mb-4">Prépare ton cœur avant de questionner l’Ange</h1>
          <p>Ferme les yeux, respire profondément. Adresse ta demande à voix haute ou en silence... Invoque ton ange gardien, tes guides ou Dieu.</p>
        </div>
      )}
      {step === 1 && (
        <div className="app">
          <h2 className="text-xl mb-2">Pose ta question à l'Ange</h2>
          <textarea className="w-full text-black p-2" rows="3" onChange={e => setQuestion(e.target.value)} placeholder="Écris ta question ici..." />
          <button onClick={askAngel} disabled={loading} className="mt-2 bg-white text-black px-4 py-2 rounded">
            {loading ? "L'Ange répond..." : "Envoyer à l'Ange"}
          </button>
          {answer && <p className="mt-4">{answer}</p>}
        </div>
      )}
    </main>
  )
}
