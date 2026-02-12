import { useState, useRef, useEffect } from 'react'

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm here to help you with any questions about Westchester Select Realty. How can I assist you today?",
      timestamp: new Date(),
      showFollowUp: false
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [waitingForFollowUp, setWaitingForFollowUp] = useState(false)
  const [conversationContext, setConversationContext] = useState({
    mentionedAreas: [],
    mentionedServices: [],
    mentionedAgents: [],
    userIntent: null,
    previousTopics: []
  })
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Enhanced Knowledge Base
  const knowledgeBase = {
    greetings: [
      "Hello! How can I help you today?",
      "Hi there! What would you like to know?",
      "Welcome! I'm here to assist you with any questions about Westchester Select Realty."
    ],
    services: {
      buying: {
        description: "We offer comprehensive buyer representation services. Our agents guide you through every step, from private showings to closing day, ensuring you find the right home at the right price in Westchester County.",
        details: [
          "Market analysis and property valuation",
          "Private showings and property tours",
          "Negotiation and contract assistance",
          "Financing guidance and referrals",
          "Home inspection coordination",
          "Closing support and paperwork"
        ]
      },
      selling: {
        description: "Our seller services include professional photography, cinematic video tours, and digital marketing campaigns designed to reach serious buyers locally and globally. We work to maximize exposure and secure premium offers.",
        details: [
          "Professional photography and staging advice",
          "Cinematic video tours and virtual walkthroughs",
          "Digital marketing across multiple platforms",
          "MLS listing and syndication",
          "Open house coordination",
          "Negotiation to maximize your sale price",
          "Transaction management from listing to closing"
        ]
      },
      investment: {
        description: "We provide detailed valuations, ROI breakdowns, and rental market analysis for investment properties. Our team helps you make informed investment decisions throughout Westchester County.",
        details: [
          "Property valuation and market analysis",
          "ROI and cash flow projections",
          "Rental market analysis",
          "Investment property recommendations",
          "Portfolio management guidance",
          "Tax and legal considerations"
        ]
      },
      renting: {
        description: "We help clients find rental properties and assist landlords with tenant placement throughout Westchester County.",
        details: [
          "Rental property search",
          "Tenant screening and placement",
          "Lease negotiation",
          "Property management referrals"
        ]
      },
      general: "Westchester Select Realty offers buyer representation, seller services, investment consulting, and rental assistance. We specialize in luxury homes, condos, and investment properties across Westchester County."
    },
    agents: {
      danny: {
        name: "Danny Pistolesi",
        specialties: ["Luxury Homes", "Investment Properties", "First-Time Buyers"],
        phone: "(914) 222-0846",
        email: "dannypistolesi@westchesterselect.com",
        description: "Danny Pistolesi is an agent specializing in Luxury Homes, Investment Properties, and First-Time Buyers. He's known for being motivated, loyal, and hardworking, taking a hands-on, one-on-one approach with every client."
      },
      frank: {
        name: "Frank Grasso",
        specialties: ["Luxury Estates", "Waterfront Properties", "Family Homes"],
        phone: "(914) 222-3553",
        email: "frankgrasso@westchsterselect.com",
        description: "Frank Grasso specializes in Luxury Estates, Waterfront Properties, and Family Homes. He's known for being driven, dependable, and committed, prioritizing clear communication and personal attention."
      },
      michael: {
        name: "Michael Muller",
        specialties: ["Buying", "Selling", "Renting", "Investment Properties"],
        phone: "(914) 222-0384",
        email: "michaelmuller@westchsterselect.com",
        description: "Michael Muller works with clients across Westchester County, specializing in Buying, Selling, Renting, and Investment Properties. He's known for being reliable, focused, and highly responsive."
      },
      lynne: {
        name: "Lynne Grasso",
        specialties: ["Luxury Homes", "New Rochelle Specialist", "High-End Sales"],
        phone: "(914) 774-6640",
        email: "lynnegrasso@westchesterselect.com",
        experience: "30+ years",
        achievement: "New Rochelle's #1 Producer 2011",
        description: "Lynne Grasso has 30+ years of experience and specializes in Luxury Homes, New Rochelle, and High-End Sales. She was New Rochelle's #1 Producer in 2011 and is known for being honest, detail-oriented, and relationship-driven."
      },
      louis: {
        name: "Louis Grasso",
        specialties: ["Buying", "Selling", "Investment Properties"],
        phone: "(914) 438-1418",
        email: "louisgrasso@westchesterselect.com",
        description: "Louis Grasso has years of hands-on experience in Buying, Selling, and Investment Properties. He's known for being dependable, honest, and committed to the people he represents."
      }
    },
    areas: [
      'Rye', 'Scarsdale', 'White Plains', 'Larchmont', 'Bronxville', 
      'Armonk', 'Tarrytown', 'Katonah', 'Pleasantville', 'Yonkers', 
      'New Rochelle', 'Sleepy Hollow', 'Mahopac', 'Yorktown Heights'
    ],
    marketStats: {
      averagePrice: "$1.2M",
      daysOnMarket: "28 Days",
      listToSaleRatio: "98.2%",
      activeListings: "156"
    }
  }

  // Advanced Intent Classification
  const classifyIntent = (message) => {
    const msg = message.toLowerCase().trim()
    const intents = {
      greeting: /^(hi|hello|hey|good morning|good afternoon|good evening|greetings)/,
      goodbye: /(bye|goodbye|see you|farewell|thanks.*bye|thank you.*bye)/,
      buying: /(buy|buying|purchase|home buyer|first time buyer|looking to buy|want to buy|need to buy|searching for|find a home|find a house)/,
      selling: /(sell|selling|list|listing|sell my|sell our|put on market|market my|help me sell)/,
      investment: /(invest|investment|rental|roi|income property|rental property|investment property|cash flow|portfolio)/,
      renting: /(rent|renting|lease|leasing|rental|tenant|landlord)/,
      pricing: /(price|pricing|cost|fee|commission|how much|expensive|affordable|budget)/,
      areas: /(area|areas|location|locations|neighborhood|neighborhoods|where|serve|cover|operate)/,
      agents: /(agent|agents|team|broker|realtor|who|contact.*agent|speak.*agent|talk.*agent)/,
      contact: /(contact|phone|email|reach|get in touch|call|speak|talk|connect)/,
      hours: /(hours|open|available|when|schedule|appointment|time|business hours)/,
      propertySearch: /(property|home|house|condo|apartment|listing|search|find|available|show me|looking for)/,
      marketInfo: /(market|statistics|stats|data|trends|prices|average|median|comparison)/,
      process: /(process|how.*work|steps|procedure|what.*involve|timeline|how long)/,
      thankYou: /(thank|thanks|appreciate|grateful|helpful)/,
      clarification: /(what|which|how|why|when|where|explain|tell me|can you|do you|will you)/
    }

    for (const [intent, pattern] of Object.entries(intents)) {
      if (pattern.test(msg)) {
        return intent
      }
    }
    return 'general'
  }

  // Extract entities from message
  const extractEntities = (message) => {
    const msg = message.toLowerCase().trim()
    const entities = {
      areas: [],
      agents: [],
      services: [],
      numbers: []
    }

    // Extract areas
    const sortedAreas = [...knowledgeBase.areas].sort((a, b) => b.length - a.length)
    sortedAreas.forEach(area => {
      if (msg.includes(area.toLowerCase())) {
        entities.areas.push(area)
      }
    })

    // Extract agents
    Object.keys(knowledgeBase.agents).forEach(key => {
      const agent = knowledgeBase.agents[key]
      const nameParts = agent.name.toLowerCase().split(' ')
      if (nameParts.some(part => msg.includes(part)) || msg.includes(key)) {
        entities.agents.push(key)
      }
    })

    // Extract services
    if (msg.match(/(buy|buying|purchase)/)) entities.services.push('buying')
    if (msg.match(/(sell|selling|list)/)) entities.services.push('selling')
    if (msg.match(/(invest|investment)/)) entities.services.push('investment')
    if (msg.match(/(rent|renting|lease)/)) entities.services.push('renting')

    // Extract numbers (for price, bedrooms, etc.)
    const numberMatches = msg.match(/\$?[\d,]+(?:\.\d+)?/g)
    if (numberMatches) {
      entities.numbers = numberMatches
    }

    return entities
  }

  // Generate intelligent response
  const generateResponse = (userMessage, intent, entities, context) => {
    const msg = userMessage.toLowerCase().trim()

    // Update context
    const newContext = { ...context }
    if (entities.areas.length > 0) {
      newContext.mentionedAreas = [...new Set([...context.mentionedAreas, ...entities.areas])]
    }
    if (entities.services.length > 0) {
      newContext.mentionedServices = [...new Set([...context.mentionedServices, ...entities.services])]
    }
    if (entities.agents.length > 0) {
      newContext.mentionedAgents = [...new Set([...context.mentionedAgents, ...entities.agents])]
    }
    newContext.userIntent = intent
    newContext.previousTopics.push(intent)
    setConversationContext(newContext)

    // Handle location-specific questions first
    if (entities.areas.length > 0) {
      const area = entities.areas[0]
      const areaDisplay = area

      if (intent === 'selling' || msg.match(/(sell|selling|list|listing)/)) {
        return {
          content: `Yes! We absolutely help clients sell properties in ${areaDisplay}, NY. Our experienced agents specialize in the Westchester County market and have deep knowledge of ${areaDisplay}. 

We provide:
• Professional photography and staging
• Video tours and virtual walkthroughs  
• Strategic marketing to maximize exposure
• Expert negotiation to get you the best price

Would you like to speak with one of our agents about selling in ${areaDisplay}?`,
          skipFollowUp: false,
          context: newContext
        }
      }

      if (intent === 'buying' || msg.match(/(buy|buying|purchase|find|looking for)/)) {
        return {
          content: `Yes! We help clients buy properties in ${areaDisplay}, NY. Our agents have extensive knowledge of the ${areaDisplay} market and can help you find the perfect home.

We assist with:
• Market analysis for ${areaDisplay}
• Property search and private showings
• Negotiation and contract assistance
• Financing guidance
• Closing support

Would you like to connect with one of our agents to start your search in ${areaDisplay}?`,
          skipFollowUp: false,
          context: newContext
        }
      }

      return {
        content: `Yes, we serve ${areaDisplay}, NY! We help clients buy, sell, and invest in properties throughout ${areaDisplay} and all of Westchester County. Our agents have local expertise and can assist with any real estate needs in that area. 

Are you looking to buy, sell, or invest in ${areaDisplay}?`,
        skipFollowUp: false,
        context: newContext
      }
    }

    // Handle specific intents
    switch (intent) {
      case 'greeting':
        return {
          content: knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)],
          skipFollowUp: true,
          context: newContext
        }

      case 'goodbye':
        return {
          content: "Thank you for visiting Westchester Select Realty! If you have any more questions, feel free to ask. Have a great day!",
          skipFollowUp: true,
          context: newContext
        }

      case 'buying':
        const buyingDetails = knowledgeBase.services.buying.details.join('\n• ')
        return {
          content: `${knowledgeBase.services.buying.description}

Our buying services include:
• ${buyingDetails}

Would you like to know more about any specific aspect of the buying process, or would you prefer to speak with one of our agents?`,
          skipFollowUp: false,
          context: newContext
        }

      case 'selling':
        const sellingDetails = knowledgeBase.services.selling.details.join('\n• ')
        return {
          content: `${knowledgeBase.services.selling.description}

Our selling services include:
• ${sellingDetails}

Would you like to learn more about our marketing approach, or would you prefer to schedule a consultation with one of our agents?`,
          skipFollowUp: false,
          context: newContext
        }

      case 'investment':
        const investmentDetails = knowledgeBase.services.investment.details.join('\n• ')
        return {
          content: `${knowledgeBase.services.investment.description}

Our investment services include:
• ${investmentDetails}

Are you looking for a specific type of investment property, or would you like to speak with one of our investment specialists?`,
          skipFollowUp: false,
          context: newContext
        }

      case 'renting':
        const rentingDetails = knowledgeBase.services.renting.details.join('\n• ')
        return {
          content: `${knowledgeBase.services.renting.description}

Our rental services include:
• ${rentingDetails}

Are you looking to rent a property or are you a landlord looking for tenant placement?`,
          skipFollowUp: false,
          context: newContext
        }

      case 'agents':
        if (entities.agents.length > 0) {
          const agentKey = entities.agents[0]
          const agent = knowledgeBase.agents[agentKey]
          let agentInfo = `${agent.description}\n\n`
          agentInfo += `Specialties: ${agent.specialties.join(', ')}\n`
          agentInfo += `Phone: ${agent.phone}\n`
          agentInfo += `Email: ${agent.email}`
          if (agent.experience) agentInfo += `\nExperience: ${agent.experience}`
          if (agent.achievement) agentInfo += `\nAchievement: ${agent.achievement}`
          
          return {
            content: agentInfo,
            skipFollowUp: false,
            context: newContext
          }
        }
        // Check if asking about availability/schedule for agents
        if (msg.match(/(when|available|schedule|hours|time|can.*speak|can.*talk|can.*meet)/)) {
          return {
            content: "Our agents are available by appointment and work flexible hours. You can contact them directly via phone or email to schedule a consultation. Most agents are available weekdays 9 AM - 7 PM, weekends by appointment, and evenings upon request.\n\nWould you like contact information for a specific agent?",
            skipFollowUp: false,
            context: newContext
          }
        }
        return {
          content: `We have 5 experienced agents, each with unique expertise:

• Danny Pistolesi - Luxury Homes, Investment Properties, First-Time Buyers
• Frank Grasso - Luxury Estates, Waterfront Properties, Family Homes  
• Michael Muller - Buying, Selling, Renting, Investment Properties
• Lynne Grasso - Luxury Homes, New Rochelle Specialist (30+ years, #1 Producer 2011)
• Louis Grasso - Buying, Selling, Investment Properties

Would you like detailed information about a specific agent?`,
          skipFollowUp: false,
          context: newContext
        }

      case 'areas':
        if (msg.match(/(which|what).*area|area.*(which|what)/)) {
          return {
            content: `We serve many areas in Westchester County including:\n\n${knowledgeBase.areas.join(', ')}\n\nAre you interested in a specific area? I can provide more details about our services there.`,
            skipFollowUp: false,
            context: newContext
          }
        }
        return {
          content: `We serve many areas in Westchester County including: ${knowledgeBase.areas.join(', ')}.\n\nWhich area are you interested in? I can provide specific information about our services there.`,
          skipFollowUp: false,
          context: newContext
        }

      case 'pricing':
        return {
          content: `Pricing varies based on the service and property type. Here's what you should know:

• Buyer representation: Typically no upfront cost (commission paid by seller)
• Seller services: Commission-based, typically 5-6% of sale price
• Investment consulting: Varies based on scope of services
• Rental services: Typically one month's rent or percentage-based

For accurate pricing information tailored to your specific situation, I recommend scheduling a consultation with one of our agents. They can provide detailed information based on your needs.

Would you like to speak with an agent about pricing?`,
          skipFollowUp: false,
          context: newContext
        }

      case 'marketInfo':
        return {
          content: `Here are the latest Westchester County market statistics:

• Average Sale Price: ${knowledgeBase.marketStats.averagePrice} (+8.5% vs last year)
• Average Days on Market: ${knowledgeBase.marketStats.daysOnMarket} (-12% vs last year)
• List-to-Sale Ratio: ${knowledgeBase.marketStats.listToSaleRatio} (+2.1% vs last year)
• Active Listings: ${knowledgeBase.marketStats.activeListings} (+15% vs last year)

The market is currently strong with properties selling quickly and at competitive prices. Would you like to know more about market trends in a specific area?`,
          skipFollowUp: false,
          context: newContext
        }

      case 'process':
        if (context.mentionedServices.includes('buying')) {
          return {
            content: `Here's our buying process:

1. Initial Consultation - We discuss your needs, budget, and preferences
2. Pre-approval - We help you get pre-approved for financing
3. Property Search - We identify and show you suitable properties
4. Making an Offer - We help you craft a competitive offer
5. Negotiation - We negotiate on your behalf
6. Inspection - We coordinate home inspections
7. Closing - We guide you through final paperwork and closing

The entire process typically takes 30-60 days. Would you like more details about any specific step?`,
            skipFollowUp: false,
            context: newContext
          }
        }
        if (context.mentionedServices.includes('selling')) {
          return {
            content: `Here's our selling process:

1. Property Evaluation - We assess your property's value and market position
2. Marketing Strategy - We develop a customized marketing plan
3. Professional Photography - We arrange professional photos and video tours
4. Listing & Marketing - We list on MLS and market across multiple platforms
5. Showings - We coordinate showings and open houses
6. Offers & Negotiation - We present offers and negotiate the best terms
7. Closing - We manage all paperwork through closing

The entire process typically takes 30-90 days depending on market conditions. Would you like more details about any specific step?`,
            skipFollowUp: false,
            context: newContext
          }
        }
        return {
          content: "I'd be happy to explain our process! Are you interested in buying, selling, or investing? Each has a different process I can walk you through.",
          skipFollowUp: false,
          context: newContext
        }

      case 'contact':
        // Check if asking to speak with agent about something specific
        if (msg.match(/(speak|talk|contact|connect).*agent.*(sell|selling|buy|buying|invest|investment)/)) {
          const serviceMatch = msg.match(/(sell|selling|buy|buying|invest|investment)/)
          const service = serviceMatch ? serviceMatch[0] : 'real estate'
          const agentList = Object.values(knowledgeBase.agents).map(agent => 
            `• ${agent.name}: ${agent.phone}`
          ).join('\n')
          
          return {
            content: `I'd be happy to connect you with one of our agents about ${service}! Here are our team members:\n\n${agentList}\n\nYou can call them directly or use the contact form on our website. Would you like information about a specific agent?`,
            skipFollowUp: false,
            context: newContext
          }
        }
        return {
          content: `You can reach us in several ways:

📞 Phone: Contact any of our agents directly
• Danny Pistolesi: (914) 222-0846
• Frank Grasso: (914) 222-3553
• Michael Muller: (914) 222-0384
• Lynne Grasso: (914) 774-6640
• Louis Grasso: (914) 438-1418

✉️ Email: Use the contact form on our website or email agents directly

💬 Chat: Continue chatting with me, and I can help answer questions

Would you like specific contact information for one of our agents?`,
          skipFollowUp: false,
          context: newContext
        }

      case 'hours':
        // Check if a specific agent was mentioned
        if (entities.agents.length > 0) {
          const agentKey = entities.agents[0]
          const agent = knowledgeBase.agents[agentKey]
          return {
            content: `${agent.name} is available by appointment and works flexible hours to accommodate your schedule. You can reach ${agent.name.split(' ')[0]} directly at ${agent.phone} or ${agent.email} to schedule a consultation or property viewing at a time that works for you.\n\nMost agents are available:\n• Weekdays: 9 AM - 7 PM\n• Weekends: By appointment\n• Evenings: Available upon request\n\nWould you like ${agent.name.split(' ')[0]}'s contact information?`,
            skipFollowUp: false,
            context: newContext
          }
        }
        return {
          content: "Our agents are available by appointment and work flexible hours to accommodate your schedule. You can contact them directly via phone or email to schedule a consultation or property viewing at a time that works for you.\n\nMost agents are available:\n• Weekdays: 9 AM - 7 PM\n• Weekends: By appointment\n• Evenings: Available upon request\n\nWould you like to schedule a consultation?",
          skipFollowUp: false,
          context: newContext
        }

      case 'propertySearch':
        return {
          content: "I'd be happy to help you find properties! Our agents have access to the latest listings in Westchester County through the MLS and their professional networks.\n\nTo help you find the perfect property, I'd need to know:\n• What area are you interested in?\n• What's your budget range?\n• What type of property (house, condo, etc.)?\n• Any specific features or requirements?\n\nWould you like to speak with one of our agents who can provide personalized recommendations?",
          skipFollowUp: false,
          context: newContext
        }

      case 'thankYou':
        return {
          content: "You're welcome! I'm glad I could help. Is there anything else you'd like to know about Westchester Select Realty?",
          skipFollowUp: true,
          context: newContext
        }

      case 'clarification':
        // Use context to provide more relevant responses
        if (context.mentionedServices.length > 0) {
          const service = context.mentionedServices[0]
          return {
            content: `I'd be happy to clarify! You mentioned ${service}. What specific aspect would you like to know more about?`,
            skipFollowUp: false,
            context: newContext
          }
        }
        return {
          content: "I'd be happy to help! Could you provide a bit more detail about what you're looking for? For example:\n• Are you looking to buy, sell, or invest?\n• What area are you interested in?\n• Do you have any specific questions?",
          skipFollowUp: false,
          context: newContext
        }

      default:
        // Use context to provide better default responses
        if (context.mentionedAreas.length > 0) {
          return {
            content: `I see you're interested in ${context.mentionedAreas.join(' and ')}. Are you looking to buy, sell, or invest in that area?`,
            skipFollowUp: false,
            context: newContext
          }
        }
        return {
          content: "I'm here to help with questions about Westchester Select Realty. You can ask me about:\n• Our services (buying, selling, investing, renting)\n• Our agents and their specialties\n• Areas we serve\n• Market information\n• The buying or selling process\n• How to contact us\n\nWhat would you like to know?",
          skipFollowUp: false,
          context: newContext
        }
    }
  }

  const getResponse = (userMessage) => {
    const intent = classifyIntent(userMessage)
    const entities = extractEntities(userMessage)
    const response = generateResponse(userMessage, intent, entities, conversationContext)
    return response
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue('')
    setIsTyping(true)

    // Add user message
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newUserMessage])

    // Check if this is a follow-up response (only if we're waiting for one)
    if (waitingForFollowUp) {
      const isFollowUpResponse = handleFollowUpResponse(userMessage)
      if (isFollowUpResponse) {
        setWaitingForFollowUp(false)
        setIsTyping(false)
        return
      }
    }

    // Reset waiting for follow-up since user sent a new message
    setWaitingForFollowUp(false)

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(userMessage)
      setIsTyping(false)
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        showFollowUp: !response.skipFollowUp
      }])
      
      // Update context
      if (response.context) {
        setConversationContext(response.context)
      }
      
      // Show follow-up question after a short delay (only if not skipped)
      if (!response.skipFollowUp) {
        setTimeout(() => {
          setWaitingForFollowUp(true)
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "Did that answer your question?",
            timestamp: new Date(),
            showFollowUp: false,
            isFollowUpQuestion: true
          }])
        }, 500)
      }
    }, 800)
  }

  const handleFollowUpResponse = (message) => {
    const msg = message.toLowerCase().trim()
    
    // Handle "yes" responses
    if (msg.match(/^(yes|yeah|yep|yup|sure|that helped|perfect|great|thanks|thank you|all good|good|ok|okay)$/)) {
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "Great! Is there anything else I can help you with today?",
            timestamp: new Date(),
            showFollowUp: false
          }])
        }, 600)
      }, 300)
      return true
    }
    
    // Handle "no" or "need more help" responses
    if (msg.match(/^(no|nope|not really|not yet|need more|more help|still need|don't understand|confused|unclear)$/)) {
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "I'd be happy to help further! What specific information are you looking for? You can also ask to speak with one of our agents directly.",
            timestamp: new Date(),
            showFollowUp: false
          }])
        }, 600)
      }, 300)
      return true
    }
    
    return false
  }

  const handleQuickFollowUp = (action) => {
    setWaitingForFollowUp(false)
    
    let response = ""
    let userMessage = ""
    
    switch(action) {
      case 'yes':
        userMessage = "Yes, that helped"
        response = "Great! Is there anything else I can help you with today?"
        break
      case 'no':
        userMessage = "No, I need more help"
        response = "I'd be happy to help further! What specific information are you looking for? You can also ask to speak with one of our agents directly."
        break
      case 'agent':
        userMessage = "I'd like to speak with an agent"
        const agentList = Object.values(knowledgeBase.agents).map(agent => 
          `• ${agent.name}: ${agent.phone}`
        ).join('\n')
        response = `I'd be happy to connect you with one of our agents! Here are our team members:\n\n${agentList}\n\nYou can also use the contact form on our website or scroll to the contact section. Would you like information about a specific agent?`
        break
      default:
        return
    }
    
    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }])
    
    // Add assistant response
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          showFollowUp: action !== 'agent'
        }])
        
        // Show follow-up question
        setTimeout(() => {
          setWaitingForFollowUp(true)
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "Did that answer your question?",
            timestamp: new Date(),
            showFollowUp: false,
            isFollowUpQuestion: true
          }])
        }, 500)
      }, 600)
    }, 300)
  }

  const handleQuickAction = (action) => {
    const quickMessages = {
      services: "What services do you offer?",
      agents: "Tell me about your agents",
      areas: "What areas do you serve?",
      contact: "How can I contact you?"
    }
    setInputValue(quickMessages[action])
    setWaitingForFollowUp(false)
    setTimeout(() => {
      handleSendMessage({ preventDefault: () => {} })
    }, 100)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) {
            setWaitingForFollowUp(false)
          }
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gold hover:bg-gold/90 text-white rounded-full shadow-2xl hover:shadow-gold/50 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center group"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] h-[calc(100vh-6rem)] sm:h-[600px] sm:max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-gold to-gold/90 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Westchester Select Realty</h3>
                <p className="text-xs text-white/90">We're here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className="space-y-2">
                <div
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-gold text-white rounded-br-sm'
                        : 'bg-white text-charcoal border border-gray-200 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
                
                {/* Follow-up question with quick actions */}
                {msg.isFollowUpQuestion && waitingForFollowUp && index === messages.length - 1 && (
                  <div className="flex justify-start">
                    <div className="flex flex-wrap gap-2 max-w-[80%]">
                      <button
                        onClick={() => handleQuickFollowUp('yes')}
                        className="px-4 py-2 text-xs sm:text-sm bg-gold hover:bg-gold/90 text-white rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        ✓ Yes, that helped
                      </button>
                      <button
                        onClick={() => handleQuickFollowUp('no')}
                        className="px-4 py-2 text-xs sm:text-sm bg-white border border-gray-300 hover:border-gold text-charcoal rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        ✗ No, I need more help
                      </button>
                      <button
                        onClick={() => handleQuickFollowUp('agent')}
                        className="px-4 py-2 text-xs sm:text-sm bg-charcoal hover:bg-charcoal/90 text-white rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        👤 Speak with an agent
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-charcoal border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions - Only show on initial message */}
          {messages.length === 1 && !waitingForFollowUp && (
            <div className="px-4 pt-2 pb-2 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2 font-medium">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'services', label: 'Services' },
                  { key: 'agents', label: 'Agents' },
                  { key: 'areas', label: 'Areas' },
                  { key: 'contact', label: 'Contact' }
                ].map((action) => (
                  <button
                    key={action.key}
                    onClick={() => handleQuickAction(action.key)}
                    className="px-3 py-1.5 text-xs bg-white border border-gray-300 text-charcoal rounded-full hover:bg-gold hover:text-white hover:border-gold transition-all duration-200"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="px-6 py-3 bg-gold hover:bg-gold/90 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Chatbot
