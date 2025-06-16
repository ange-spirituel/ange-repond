js
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ange Répond</title>
        <meta name="description" content="Posez votre question à votre guide spirituel" />
      </Head>
      <Header />
      <main className="main">
        <h1 className="title">Bienvenue sur Ange Répond</h1>
        <p className="description">
          Prenez un moment pour vous connecter à Dieu, vos guides ou votre ange gardien.
          Pensez fort à votre question, exprimez-la à voix haute ou à voix basse, puis cliquez ci-dessous :
        </p>
        <Link href="/ask" className="btn">Poser ma question</Link>
      </main>
      <Footer />
    </div>
  )
}
