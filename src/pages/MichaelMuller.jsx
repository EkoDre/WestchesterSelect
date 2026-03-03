import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import logo from '../assets/logo.png'
import Chatbot from '../components/Chatbot'
import AgentContactForm from '../components/AgentContactForm'

const AGENT_NAME = 'Michael Muller'
const AGENT_EMAIL = 'michaelmuller@westchesterselect.com'

function MichaelMuller() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const scrollToContact = () => {
    document.getElementById('agent-contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="Westchester Select Realty" 
                className="h-14 md:h-20 w-auto cursor-pointer" 
                onClick={() => navigate('/')} 
              />
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm font-medium text-charcoal hover:text-gold transition-all duration-200 rounded-lg hover:bg-gray-50"
            >
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-64 h-80 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
              <img 
                src="/michael-muller.jpeg" 
                alt="Michael Muller"
                className="w-full h-full object-cover object-top"
                style={{ objectPosition: 'center top' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-4">Michael Muller</h1>
            <div className="text-2xl text-gold font-semibold mb-6">Agent</div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-lg">
              <a href="tel:9142220384" className="bg-gold hover:bg-gold/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <span>📞</span>
                <span>(914) 222-0384</span>
              </a>
              <button onClick={scrollToContact} className="bg-gold hover:bg-gold/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <span>✉️</span>
                <span>Email Me</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-4">ABOUT</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-6 tracking-tight">About Michael</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold/50 mb-8"></div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-charcoal leading-relaxed mb-6">
              My name is Michael Muller, and I work with clients across Westchester County, New York, guiding them through real estate decisions with clarity, strategy, and attention to detail.
            </p>
            
            <p className="text-xl text-charcoal leading-relaxed mb-6">
              I approach real estate with a strong belief that the right home sets the foundation for everything that follows. My goal is to make the process smooth, informed, and stress-free—so clients feel confident not just at closing, but long after they move in.
            </p>

            <p className="text-xl text-charcoal leading-relaxed mb-8">
              I'm known for being reliable, focused, and highly responsive. I take the time to understand each client's needs and tailor my approach accordingly, whether they're buying, selling, renting, or investing. No two clients are the same, and neither is my strategy for them.
            </p>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-12 text-center">Areas of Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Buying</h3>
              <p className="text-gray-600">Expert guidance to help you find the perfect home that meets your needs and lifestyle.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Selling</h3>
              <p className="text-gray-600">Strategic approach to maximize your property's value and ensure a smooth sale process.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">🔑</div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Renting & Investing</h3>
              <p className="text-gray-600">Comprehensive support for rental properties and investment opportunities throughout Westchester.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="agent-contact" className="py-20 px-4 bg-gradient-to-br from-charcoal via-charcoal to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Work Together?</h2>
          <p className="text-xl md:text-2xl leading-relaxed mb-8 font-light text-gray-300">
            Let's discuss your real estate goals and how I can help you achieve them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <a 
              href="tel:9142220384"
              className="bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Call (914) 222-0384
            </a>
          </div>
          <AgentContactForm agentName={AGENT_NAME} agentEmail={AGENT_EMAIL} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm md:text-base font-light">
            © 2025 Westchester Select Realty — All Rights Reserved | Licensed Real Estate Brokerage | Equal Housing Opportunity
          </p>
        </div>
      </footer>
      <Chatbot />
    </div>
  )
}

export default MichaelMuller
