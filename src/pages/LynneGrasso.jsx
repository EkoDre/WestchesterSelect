import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import logo from '../assets/logo.png'
import Chatbot from '../components/Chatbot'
import AgentContactForm from '../components/AgentContactForm'

const AGENT_NAME = 'Lynne Grasso'
const AGENT_EMAIL = 'lynnegrasso@westchesterselect.com'

function LynneGrasso() {
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
                src="/lynne.jpg" 
                alt="Lynne Grasso"
                className="w-full h-full object-cover object-top"
                style={{ objectPosition: 'center top' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-4">Lynne Grasso</h1>
            <div className="text-2xl text-gold font-semibold mb-6">Agent</div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-lg">
              <a href="tel:9147746640" className="bg-gold hover:bg-gold/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <span>📞</span>
                <span>(914) 774-6640</span>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-6 tracking-tight">About Lynne</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold/50 mb-8"></div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-charcoal leading-relaxed mb-6">
              My name is Lynne Grasso, and I've been helping buyers and sellers throughout Westchester County for over 30 years. As a lifelong resident of New Rochelle, I have a deep understanding of the community and the local market.
            </p>
            
            <p className="text-xl text-charcoal leading-relaxed mb-6">
              I was honored to be named New Rochelle's #1 Real Estate Producer in 2011, and I've had the opportunity to market and sell some of the highest-priced homes in the city. Over the years, I've worked with a wide range of clients and properties—from individual homes to luxury developments—always with the same level of care and commitment.
            </p>

            <p className="text-xl text-charcoal leading-relaxed mb-8">
              I pride myself on being honest, detail-oriented, and relationship-driven. I take the time to truly understand my clients' needs and guide them through the process with confidence, clear communication, and strong negotiation. For me, real estate is about trust, long-term relationships, and helping people make decisions they feel good about.
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
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Luxury Homes</h3>
              <p className="text-gray-600">Specializing in marketing and selling some of the highest-priced homes in New Rochelle and throughout Westchester County.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">🏡</div>
              <h3 className="text-xl font-bold text-charcoal mb-2">New Rochelle Specialist</h3>
              <p className="text-gray-600">Deep local knowledge as a lifelong resident with over 30 years of experience in the New Rochelle market.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Luxury Developments</h3>
              <p className="text-gray-600">Expertise in working with individual homes and luxury developments, providing the same level of care and commitment to all clients.</p>
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
              href="tel:9147746640"
              className="bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Call (914) 774-6640
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

export default LynneGrasso
