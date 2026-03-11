import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Destinations from './components/Destinations'
import Quiz from './components/Quiz'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

export default function App() {
  return (
    <div className="relative min-h-screen bg-dark text-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Destinations />
        <Quiz />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
