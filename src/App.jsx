import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './assets/logo.png'
import Chatbot from './components/Chatbot'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sectionsRef = useRef({})
  const navigate = useNavigate()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.fade-in')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const scrollToSection = (id) => {
    const element = sectionsRef.current[id]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            <div className="flex items-center">
              <img src={logo} alt="Westchester Select Realty" className="h-14 md:h-20 w-auto cursor-pointer" onClick={() => scrollToSection('home')} />
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <button onClick={() => scrollToSection('home')} className="px-4 py-2 text-sm font-medium text-charcoal hover:text-gold transition-all duration-200 rounded-lg hover:bg-gray-50">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="px-4 py-2 text-sm font-medium text-charcoal hover:text-gold transition-all duration-200 rounded-lg hover:bg-gray-50">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="px-4 py-2 text-sm font-medium text-charcoal hover:text-gold transition-all duration-200 rounded-lg hover:bg-gray-50">
                Services
              </button>
              <button onClick={() => scrollToSection('areas')} className="px-4 py-2 text-sm font-medium text-charcoal hover:text-gold transition-all duration-200 rounded-lg hover:bg-gray-50">
                Areas
              </button>
              <button onClick={() => scrollToSection('blog')} className="px-4 py-2 text-sm font-medium text-charcoal hover:text-gold transition-all duration-200 rounded-lg hover:bg-gray-50">
                Blog
              </button>
              <button onClick={() => scrollToSection('contact')} className="px-4 py-2 text-sm font-medium text-charcoal bg-gold hover:bg-gold/90 transition-all duration-200 rounded-lg shadow-md hover:shadow-lg">
                Contact
              </button>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-charcoal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-4">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-charcoal hover:text-gold">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-charcoal hover:text-gold">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left text-charcoal hover:text-gold">
                Services
              </button>
              <button onClick={() => scrollToSection('areas')} className="block w-full text-left text-charcoal hover:text-gold">
                Areas
              </button>
              <button onClick={() => scrollToSection('blog')} className="block w-full text-left text-charcoal hover:text-gold">
                Blog
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-charcoal hover:text-gold">
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={(el) => (sectionsRef.current.home = el)}
        className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4 pt-24"
      >
        <div className="text-center px-4 max-w-6xl mx-auto fade-in">
          <div className="mb-8 md:mb-12 flex justify-center">
            <img src={logo} alt="Westchester Select Realty" className="h-40 sm:h-56 md:h-72 lg:h-96 w-auto drop-shadow-2xl max-w-full" />
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal mb-8 md:mb-12 font-light tracking-tight px-2">
            Where Local Expertise Meets Luxury Living
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto bg-gold hover:bg-gold/90 active:bg-gold/90 text-charcoal px-6 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl active:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-97 hover:-translate-y-1"
            >
              Schedule Consultation
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="w-full sm:w-auto border-2 border-charcoal text-charcoal hover:bg-charcoal active:bg-charcoal hover:text-charcoal active:text-charcoal px-6 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold shadow-md hover:shadow-lg active:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-97"
            >
              Our Services
            </button>
            <button
              onClick={() => scrollToSection('team')}
              className="w-full sm:w-auto border-2 border-charcoal text-charcoal hover:bg-charcoal active:bg-charcoal hover:text-charcoal active:text-charcoal px-6 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold shadow-md hover:shadow-lg active:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-97"
            >
              Meet Our Agents
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        id="team"
        ref={(el) => (sectionsRef.current.team = el)}
        className="py-20 md:py-32 px-4 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="fade-in mb-16 text-center">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-4">OUR TEAM</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 tracking-tight">Meet Our Agents</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-charcoal max-w-3xl mx-auto font-light">
              Licensed professionals with deep local knowledge and proven track records
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center">
            {[
              { 
                name: 'Danny Pistolesi', 
                title: 'Agent', 
                phone: '(914) 222-0846',
                email: 'dannypistolesi@westchesterselect.com',
                experience: 'Expert Local Knowledge', 
                specialties: 'Luxury Homes, Investment Properties, First-Time Buyers', 
                transactions: 'Trusted Westchester Specialist',
                image: '/danny-pistolesi..JPG'
              },
              { 
                name: 'Frank Grasso', 
                title: 'Agent', 
                phone: '(914) 222-3553',
                email: 'frankgrasso@westchsterselect.com',
                experience: 'Expert Local Knowledge', 
                specialties: 'Luxury Estates, Waterfront Properties, Family Homes', 
                transactions: 'Trusted Westchester Specialist',
                image: '/frank-grasso.jpg'
              },
              { 
                name: 'Michael Muller', 
                title: 'Agent', 
                phone: '(914) 222-0384',
                email: 'michaelmuller@westchsterselect.com',
                experience: 'Expert Local Knowledge', 
                specialties: 'Buying, Selling, Renting, Investment Properties', 
                transactions: 'Trusted Westchester Specialist',
                image: '/michael-muller.jpeg'
              },
              { 
                name: 'Lynne Grasso', 
                title: 'Agent', 
                phone: '(914) 774-6640',
                email: 'lynnegrasso@westchesterselect.com',
                experience: '30+ Years Experience', 
                specialties: 'Luxury Homes, New Rochelle Specialist, High-End Sales', 
                transactions: 'New Rochelle\'s #1 Producer 2011',
                image: '/lynne.jpg'
              },
              { 
                name: 'Louis Grasso', 
                title: 'Agent', 
                phone: '(914) 438-1418',
                email: 'louisgrasso@westchesterselect.com',
                experience: 'Years of Hands-On Experience', 
                specialties: 'Buying, Selling, Investment Properties', 
                transactions: 'Trusted Westchester Specialist',
                image: '/louis.jpg'
              },
            ].map((agent, index) => (
              <div key={index} className="fade-in touch-active bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 border border-gray-100 text-center flex flex-col h-full">
                <div className="w-48 h-56 mx-auto mb-6 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                  {agent.image ? (
                    <img 
                      src={agent.image} 
                      alt={agent.name}
                      className="w-full h-full object-cover object-top"
                      style={{ objectPosition: 'center top' }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        const fallback = e.target.parentElement.querySelector('.image-fallback')
                        if (fallback) fallback.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <span className="text-4xl image-fallback" style={{ display: agent.image ? 'none' : 'flex' }}>👤</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-2">{agent.name}</h3>
                <div className="text-gold font-semibold mb-4">{agent.title}</div>
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div>📅 {agent.experience}</div>
                  <div>🎯 {agent.specialties}</div>
                  <div>✅ {agent.transactions}</div>
                </div>
                <div className="space-y-3 mb-6">
                  <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="block text-gold hover:text-gold/80 font-semibold transition-colors">
                    📞 {agent.phone}
                  </a>
                  <a href={`mailto:${agent.email}`} className="block text-gold hover:text-gold/80 font-semibold transition-colors text-sm">
                    ✉️ {agent.email}
        </a>
      </div>
                <div className="mt-auto">
                {agent.name === 'Danny Pistolesi' ? (
                  <button 
                    onClick={() => navigate('/danny-pistolesi')}
                    className="w-full bg-gold hover:bg-gold/90 text-white py-2 rounded-lg font-medium transition-colors mb-2"
                  >
                    View Profile
                  </button>
                ) : agent.name === 'Frank Grasso' ? (
                  <button 
                    onClick={() => navigate('/frankie-grasso')}
                    className="w-full bg-gold hover:bg-gold/90 text-white py-2 rounded-lg font-medium transition-colors mb-2"
                  >
                    View Profile
                  </button>
                ) : agent.name === 'Michael Muller' ? (
                  <button 
                    onClick={() => navigate('/michael-muller')}
                    className="w-full bg-gold hover:bg-gold/90 text-white py-2 rounded-lg font-medium transition-colors mb-2"
                  >
                    View Profile
                  </button>
                ) : agent.name === 'Lynne Grasso' ? (
                  <button 
                    onClick={() => navigate('/lynne-grasso')}
                    className="w-full bg-gold hover:bg-gold/90 text-white py-2 rounded-lg font-medium transition-colors mb-2"
                  >
                    View Profile
                  </button>
                ) : agent.name === 'Louis Grasso' ? (
                  <button 
                    onClick={() => navigate('/louis-grasso')}
                    className="w-full bg-gold hover:bg-gold/90 text-white py-2 rounded-lg font-medium transition-colors mb-2"
                  >
                    View Profile
                  </button>
                ) : null}
                <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="block w-full bg-charcoal hover:bg-gold text-white py-2 rounded-lg font-medium transition-colors">
                  Call Now
                </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-5xl mx-auto fade-in">
          <p className="text-xl md:text-2xl text-charcoal leading-relaxed text-center font-light">
            Welcome to <span className="font-semibold text-gold">Westchester Select Realty</span>, a premier full-service brokerage serving the heart of Westchester County. We specialize in buying, selling, and leasing luxury homes, condos, and investment properties across Rye, Scarsdale, White Plains, Larchmont, and beyond. Whether you're upgrading, relocating, or investing, our trusted brokers bring unmatched local insight and negotiation power to every deal.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={(el) => (sectionsRef.current.about = el)}
        className="py-20 md:py-32 px-4 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="fade-in mb-16">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-4">ABOUT US</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 tracking-tight">About Us</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto mb-8"></div>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-8 text-center px-2">
              Built on Integrity. <span className="text-gold">Focused on Results.</span>
            </h3>
          </div>
          <div className="fade-in">
            <p className="text-xl md:text-2xl text-charcoal leading-relaxed text-center max-w-4xl mx-auto font-light">
              At Westchester Select Realty, we believe real estate isn't just about property — it's about people. Our licensed brokers live and breathe Westchester, offering clients a deep understanding of the area's neighborhoods, schools, and investment potential. From riverfront estates to modern developments, we've helped hundreds of families and investors find their perfect match. With Westchester Select Realty, you get local experience, market intelligence, and a commitment to excellence in every transaction.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={(el) => (sectionsRef.current.services = el)}
        className="py-20 md:py-32 px-4 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="fade-in mb-16">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-2 bg-gold/10 text-gold text-sm font-semibold rounded-full">OUR SERVICES</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal tracking-tight text-center sm:text-left">Our Services</h2>
              <button 
                onClick={() => scrollToSection('team')}
                type="button"
                className="bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap flex-shrink-0"
              >
                Meet Our Agents ↓
              </button>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            <div className="fade-in touch-active bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gold/30 active:border-gold/30 hover:-translate-y-2 active:-translate-y-2">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">Buyer Representation</h3>
              <p className="text-charcoal leading-relaxed text-lg">
                Buying a home in Westchester should be exciting — not overwhelming. Our agents guide you through every step, from private showings to closing day, ensuring you find the right home at the right price.
              </p>
            </div>
            <div className="fade-in touch-active bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gold/30 active:border-gold/30 hover:-translate-y-2 active:-translate-y-2">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">Seller Services</h3>
              <p className="text-charcoal leading-relaxed text-lg">
                Selling your property with Westchester Select Realty means maximum exposure and premium offers. We use professional photography, cinematic video tours, and digital marketing campaigns designed to reach serious buyers locally and globally.
              </p>
            </div>
            <div className="fade-in touch-active bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gold/30 active:border-gold/30 hover:-translate-y-2 active:-translate-y-2">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">Investment Consulting</h3>
              <p className="text-charcoal leading-relaxed text-lg">
                Looking for income-producing properties? Our brokerage provides detailed valuations, ROI breakdowns, and rental market analysis so you can make informed investment decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="fade-in mb-16 text-center">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-4">WHY CHOOSE US</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 tracking-tight">Why Westchester Select Realty</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🏆', title: 'Award-Winning', desc: 'Recognized excellence in real estate service' },
              { icon: '📊', title: 'Market Leaders', desc: 'Top 1% of agents in Westchester County' },
              { icon: '🤝', title: '500+ Transactions', desc: 'Successfully closed deals since 2018' },
              { icon: '⭐', title: '5-Star Rated', desc: 'Consistently rated by satisfied clients' },
            ].map((item, index) => (
              <div key={index} className="fade-in text-center p-6">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Statistics Section */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="fade-in mb-16 text-center">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-4">MARKET INSIGHTS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 tracking-tight">Westchester Market Statistics</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-charcoal max-w-3xl mx-auto font-light">
              Real-time data to help you make informed decisions
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: '$1.2M', label: 'Average Sale Price', change: '+8.5%' },
              { value: '28 Days', label: 'Avg Days on Market', change: '-12%' },
              { value: '98.2%', label: 'List-to-Sale Ratio', change: '+2.1%' },
              { value: '156', label: 'Active Listings', change: '+15%' },
            ].map((stat, index) => (
              <div key={index} className="fade-in bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg text-center border border-gray-100">
                <div className="text-4xl font-bold text-gold mb-2">{stat.value}</div>
                <div className="text-charcoal font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-green-600 font-medium">{stat.change} vs last year</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="fade-in mb-16 text-center">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-4">CLIENT TESTIMONIALS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 tracking-tight">What Our Clients Say</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah & Michael Chen', location: 'Scarsdale', text: 'Westchester Select Realty made our home buying experience seamless. Their expertise in the Scarsdale market helped us find our dream home in just 3 weeks.', rating: 5 },
              { name: 'Robert Martinez', location: 'Rye', text: 'Outstanding service from start to finish. They sold our waterfront property above asking price and handled every detail with professionalism.', rating: 5 },
              { name: 'Jennifer Williams', location: 'Larchmont', text: 'As a first-time buyer, I was nervous about the process. The team at Westchester Select Realty guided me through every step with patience and expertise.', rating: 5 },
            ].map((testimonial, index) => (
              <div key={index} className="fade-in touch-active bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-gold text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-charcoal mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-charcoal">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve Section */}
      <section
        id="areas"
        ref={(el) => (sectionsRef.current.areas = el)}
        className="py-20 md:py-32 px-4 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="fade-in mb-16 text-center">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-4">AREAS WE SERVE</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 tracking-tight">Areas We Serve</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto mb-12"></div>
          </div>
          <div className="fade-in mb-12">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 px-2">
              {['Rye', 'Scarsdale', 'White Plains', 'Larchmont', 'Bronxville', 'Armonk', 'Tarrytown', 'Katonah', 'Pleasantville', 'Yonkers', 'New Rochelle', 'Sleepy Hollow', 'Mahopac', 'Yorktown Heights', ''].map((area, index) => (
                <span key={index} className="px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-full shadow-md hover:shadow-lg active:shadow-lg border border-gray-200 hover:border-gold active:border-gold text-charcoal text-sm sm:text-base font-medium transition-all duration-300 hover:-translate-y-1 active:-translate-y-1">
                  {area}
                </span>
              ))}
            </div>
          </div>
          <div className="fade-in text-center">
            <p className="text-xl md:text-2xl text-charcoal leading-relaxed max-w-4xl mx-auto font-light">
              Each neighborhood tells a story — and Westchester Select Realty knows them all. We help clients find properties that match their lifestyle, whether it's a waterfront retreat, a family home, or a smart investment near NYC.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        id="blog"
        ref={(el) => (sectionsRef.current.blog = el)}
        className="py-20 md:py-32 px-4 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="fade-in mb-16 text-center">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-4">REAL ESTATE INSIGHTS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 tracking-tight">Real Estate Insights</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-charcoal max-w-3xl mx-auto font-light">
              Here are some of the topics we share with our clients:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              'Top 5 Westchester Neighborhoods to Buy a Home in 2025',
              "Why Westchester County Remains New York's Smartest Real Estate Investment",
              "Moving from NYC to Westchester? Here's What You Should Know",
              'How to Sell Your Westchester Home for Maximum Value',
              'Luxury Living in Westchester: What $2 Million Buys You in 2025',
            ].map((title, index) => (
              <div key={index} className="fade-in touch-active bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 border-l-4 border-gold hover:-translate-y-2 active:-translate-y-2 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                  <h3 className="text-lg font-bold text-charcoal group-hover:text-gold transition-colors">{title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="fade-in mt-16 text-center">
            <p className="text-xl text-charcoal leading-relaxed max-w-4xl mx-auto font-light">
              Each article we publish is written to help buyers and sellers make smarter, more confident real estate decisions throughout Westchester County.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={(el) => (sectionsRef.current.contact = el)}
        className="py-20 md:py-32 px-4 bg-gradient-to-br from-charcoal via-charcoal to-gray-800 text-charcoal"
      >
        <div className="max-w-6xl mx-auto">
          <div className="fade-in mb-16 text-center">
            <span className="inline-block px-4 py-2 bg-gold/20 text-gold text-sm font-semibold rounded-full mb-6">GET IN TOUCH</span>
            <p className="text-lg md:text-xl text-white mb-4 font-medium">Ready to buy your dream home ?</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">Let's Move You Forward</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl leading-relaxed mb-16 font-light max-w-3xl mx-auto text-gray-300">
              Ready to buy, sell, or invest in Westchester County? Connect with Westchester Select Realty today for a complimentary consultation and property analysis.
            </p>
          </div>
          <div className="fade-in max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white flex items-center justify-center gap-3">
                <span className="text-3xl">✉️</span>
                <span>Send Us a Message</span>
              </h3>
              <form className="space-y-5">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">👤</div>
                  <input type="text" placeholder="Your Name" className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:bg-white/15 transition-all duration-300" />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">📧</div>
                  <input type="email" placeholder="Your Email" className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:bg-white/15 transition-all duration-300" />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">📞</div>
                  <input type="tel" placeholder="Phone Number" className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:bg-white/15 transition-all duration-300" />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg z-10">🎯</div>
                  <select className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gold focus:bg-white/15 transition-all duration-300 appearance-none cursor-pointer">
                    <option value="" className="bg-gray-800">I'm interested in...</option>
                    <option value="buying" className="bg-gray-800">Buying a Home</option>
                    <option value="selling" className="bg-gray-800">Selling a Home</option>
                    <option value="investment" className="bg-gray-800">Investment Property</option>
                    <option value="valuation" className="bg-gray-800">Property Valuation</option>
                    <option value="general" className="bg-gray-800">General Inquiry</option>
                  </select>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-6 text-gray-400 text-lg">💬</div>
                  <textarea rows="4" placeholder="Your Message" className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:bg-white/15 transition-all duration-300 resize-none"></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 active:bg-gold/90 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-gold/50 active:shadow-gold/50 transition-all duration-300 transform hover:scale-105 active:scale-97 mt-6"
                >
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-charcoal font-bold mb-4">Westchester Select Realty</h4>
              <p className="text-sm mb-4">Premier real estate services in Westchester County. Your trusted partner for buying, selling, and investing.</p>
            </div>
            <div>
              <h4 className="text-charcoal font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-gold transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-gold transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('areas')} className="hover:text-gold transition-colors">Areas We Serve</button></li>
                <li><button onClick={() => scrollToSection('blog')} className="hover:text-gold transition-colors">Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-charcoal font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>Buyer Representation</li>
                <li>Seller Services</li>
                <li>Investment Consulting</li>
                <li>Property Valuation</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm md:text-base font-light mb-4">
              © 2025 Westchester Select Realty — All Rights Reserved | Licensed Real Estate Brokerage | Equal Housing Opportunity
            </p>
            <div className="text-gray-400 text-sm">
              <a
                href="/privacy-policy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline transition-colors"
              >
                Privacy Policy
              </a>
              <span className="mx-2">|</span>
              <a
                href="/terms-and-conditions.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline transition-colors"
              >
                Terms & Conditions
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 flex items-center justify-center gap-2 text-gray-500 text-sm">
              <span>Powered by</span>
              <img src="/logo-mark.png" alt="EkoMade Labs" className="h-6 w-auto" />
              <span className="text-gray-400">EkoMade Labs</span>
            </div>
          </div>
        </div>
      </footer>
      <Chatbot />
    </div>
  )
}

export default App
