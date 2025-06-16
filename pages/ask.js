js
import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Ask() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    })
    const data = await res.json()
    setAnswer(data.answer)
    setLoading(false)
  }

  return (
    <div>
      <Head>
        <title>Posez votre question à l'ange</title>
      </Head>
      <Header />
      <main className="main">
        <h1>Posez votre question à l'ange</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Votre question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>Envoyer</button>
        </form>
        {loading && <p>L'ange réfléchit...</p>}
        {answer && (
          <div className="response">
            <h2>Réponse de l'ange :</h2>
            <p>{answer}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
