import type {
  Article,
  Client,
  Industry,
  Job,
  Project,
  ServiceItem,
  SiteStat,
  TeamMember,
  Testimonial,
} from "@/lib/types";

const img = (seed: string, w = 1600, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const services: ServiceItem[] = [
  {
    slug: "marketing",
    title: "Marketing",
    category: "marketing",
    shortDescription: "Digital, social, performance, and strategy that move the needle.",
    description:
      "We plan and run marketing systems that connect attention to conversion — from paid media to organic growth.",
    offerings: [
      "Digital Marketing",
      "Social Media Marketing",
      "Performance Marketing",
      "Media Buying",
      "Content Marketing",
      "Marketing Strategy",
    ],
    process: ["Research", "Strategy", "Creative", "Launch", "Optimize"],
    faqs: [
      {
        q: "Do you manage paid media in-house?",
        a: "Yes. We plan, buy, and optimize media across Meta, Google, TikTok, and more.",
      },
      {
        q: "Can you work with our existing creatives?",
        a: "Absolutely — or we can produce everything end-to-end under one roof.",
      },
    ],
  },
  {
    slug: "branding-content",
    title: "Branding & Content",
    category: "branding",
    shortDescription: "Identity, voice, and creative direction that make brands memorable.",
    description:
      "From brand strategy to visual systems and content engines, we build identities that feel inevitable.",
    offerings: [
      "Brand Strategy",
      "Brand Identity",
      "Logo Design",
      "Visual Identity",
      "Content Creation",
      "Copywriting",
      "Creative Direction",
    ],
    process: ["Discover", "Position", "Design", "Systemize", "Launch"],
    faqs: [
      {
        q: "Do you rebuild existing brands?",
        a: "Yes — rebrands, refreshes, and full identity systems.",
      },
    ],
  },
  {
    slug: "media-production",
    title: "Media Production",
    category: "media-production",
    shortDescription: "Photography, video, commercials, and social-ready production.",
    description:
      "Cinematic storytelling for brands — photo, video, TV, radio, and always-on social production.",
    offerings: [
      "Photography",
      "Videography",
      "Commercial Production",
      "Social Media Production",
      "TV Commercials",
      "Radio Production",
    ],
    process: ["Concept", "Pre-production", "Shoot", "Post", "Deliver"],
    faqs: [
      {
        q: "Do you handle full commercial production?",
        a: "Yes, from concept and casting through final delivery.",
      },
    ],
  },
  {
    slug: "web-solutions",
    title: "Web Solutions",
    category: "web-solutions",
    shortDescription: "Strategy, UI/UX, development, e-commerce, and maintenance.",
    description:
      "Websites and digital experiences engineered to look exceptional and convert.",
    offerings: [
      "Website Strategy",
      "UI/UX Design",
      "Website Development",
      "WordPress Development",
      "E-Commerce",
      "Web Applications",
      "Website Maintenance",
    ],
    process: ["Brief", "UX", "Design", "Build", "Launch", "Support"],
    faqs: [
      {
        q: "Custom or WordPress?",
        a: "Both. We choose based on goals, speed, and long-term ownership.",
      },
    ],
  },
  {
    slug: "technology",
    title: "Technology",
    category: "technology",
    shortDescription: "Apps, platforms, CRM, automation, and digital products.",
    description:
      "Custom technology that amplifies brand and operations — not technology for its own sake.",
    offerings: [
      "Web Applications",
      "Mobile Applications",
      "Custom Platforms",
      "CRM / Business Systems",
      "Automation",
      "Digital Products",
    ],
    process: ["Discover", "Architect", "Build", "Integrate", "Scale"],
    faqs: [
      {
        q: "Do you build MVPs for startups?",
        a: "Yes — lean products designed to learn fast and scale cleanly.",
      },
    ],
  },
  {
    slug: "events-activations",
    title: "Events & Activations",
    category: "events",
    shortDescription: "Experiential marketing, launches, giveaways, and influencer moments.",
    description:
      "Live brand moments that people feel — and talk about long after the event ends.",
    offerings: [
      "Event Management",
      "Brand Activations",
      "Corporate Events",
      "Launch Events",
      "Experiential Marketing",
      "Giveaways",
      "Influencer Activations",
    ],
    process: ["Concept", "Plan", "Produce", "Activate", "Measure"],
    faqs: [
      {
        q: "Can you run multi-city activations?",
        a: "Yes. We plan logistics, talent, and creative across locations.",
      },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "aurora-residences",
    title: "Aurora Residences",
    client: "Aurora Developments",
    industry: "Real Estate",
    services: ["Branding", "Digital", "Performance"],
    filters: ["branding", "digital"],
    coverImage: img("aurora", 1800, 1200),
    challenge:
      "A new residential launch needed distinction in a crowded skyline of lookalike campaigns.",
    objective: "Build desire before launch and drive qualified inquiries.",
    strategy:
      "Position Aurora as a lifestyle chapter, not a floor plan — then amplify with performance media.",
    idea: "“Live Above the Noise” — a quiet luxury narrative told through light, space, and stillness.",
    execution:
      "Full identity, cinematic film, social system, landing experience, and always-on paid acquisition.",
    results: [
      { label: "Reach", value: "+180%" },
      { label: "Leads", value: "1,240" },
      { label: "Engagement", value: "+92%" },
    ],
    gallery: [img("aurora1"), img("aurora2"), img("aurora3")],
    featured: true,
    published: true,
  },
  {
    slug: "velvet-kitchen",
    title: "Velvet Kitchen",
    client: "Velvet Hospitality Group",
    industry: "F&B",
    services: ["Brand Identity", "Content", "Social"],
    filters: ["branding", "social", "production"],
    coverImage: img("velvet", 1800, 1200),
    challenge: "A refined dining concept risked blending into generic “premium restaurant” visuals.",
    objective: "Create a distinctive brand world that drives reservations and social pull.",
    strategy: "Build a sensory identity system — taste translated into typography, color, and motion.",
    idea: "“Hunger is a feeling” — intimate, moody, memorable.",
    execution: "Identity, photography direction, menu design, and social content engine.",
    results: [
      { label: "Followers", value: "+64%" },
      { label: "Reservations", value: "+41%" },
    ],
    gallery: [img("velvet1"), img("velvet2")],
    featured: true,
    published: true,
  },
  {
    slug: "northline-commerce",
    title: "Northline Commerce",
    client: "Northline",
    industry: "Retail",
    services: ["Web", "UX", "Performance"],
    filters: ["web", "digital"],
    coverImage: img("northline", 1800, 1200),
    challenge: "An outdated storefront was losing conversions and brand trust.",
    objective: "Rebuild the digital experience around clarity, speed, and conversion.",
    strategy: "UX-first redesign with performance marketing aligned to product stories.",
    idea: "Editorial commerce — shop like browsing a magazine.",
    execution: "Full e-commerce redesign, photography guidelines, and paid social funnel.",
    results: [
      { label: "Conversion", value: "+38%" },
      { label: "AOV", value: "+22%" },
    ],
    gallery: [img("north1"), img("north2"), img("north3")],
    featured: true,
    published: true,
  },
  {
    slug: "pulse-auto",
    title: "Pulse Auto Launch",
    client: "Pulse Motors",
    industry: "Automotive",
    services: ["Production", "Events", "Digital"],
    filters: ["production", "events", "digital"],
    coverImage: img("pulse", 1800, 1200),
    challenge: "A new model needed cultural heat, not just a product film.",
    objective: "Own the launch week conversation across city and screen.",
    strategy: "Pair a cinematic film with an experiential night activation.",
    idea: "“Motion is the message.”",
    execution: "Commercial production, launch event, influencer activations, and digital amplification.",
    results: [
      { label: "Event RSVPs", value: "2,100" },
      { label: "Video views", value: "4.2M" },
    ],
    gallery: [img("pulse1"), img("pulse2")],
    featured: true,
    published: true,
  },
  {
    slug: "haven-hotels",
    title: "Haven Hotels",
    client: "Haven Collection",
    industry: "Hospitality",
    services: ["Branding", "Photography", "Web"],
    filters: ["branding", "web", "production"],
    coverImage: img("haven", 1800, 1200),
    challenge: "A boutique hotel group lacked a unified story across properties.",
    objective: "One brand language, many destinations.",
    strategy: "Create a flexible identity system and photography bible for every property.",
    idea: "“Arrive somewhere new — without leaving yourself.”",
    execution: "Brand system, property photography, booking site, and content templates.",
    results: [
      { label: "Direct bookings", value: "+29%" },
      { label: "Brand recall", value: "+45%" },
    ],
    gallery: [img("haven1"), img("haven2")],
    featured: false,
    published: true,
  },
  {
    slug: "clara-health",
    title: "Clara Health",
    client: "Clara Clinics",
    industry: "Healthcare",
    services: ["Strategy", "Digital", "Web"],
    filters: ["digital", "web"],
    coverImage: img("clara", 1800, 1200),
    challenge: "Clinical excellence wasn’t translating into patient trust online.",
    objective: "Humanize care without losing credibility.",
    strategy: "Clarity-first messaging, calm design, and conversion-focused patient journeys.",
    idea: "“Care you can understand.”",
    execution: "Website rebuild, content strategy, and performance campaigns for key services.",
    results: [
      { label: "Appointments", value: "+57%" },
      { label: "Bounce rate", value: "-31%" },
    ],
    gallery: [img("clara1"), img("clara2")],
    featured: false,
    published: true,
  },
];

export const industries: Industry[] = [
  {
    slug: "real-estate",
    title: "Real Estate",
    description: "Launch narratives, performance funnels, and brand worlds for developments.",
    capabilities: ["Branding", "Performance", "Digital", "Content", "Events", "Web"],
    visual: img("ind-re", 1400, 900),
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    description: "Sensory branding and experiences that turn stays into stories.",
    capabilities: ["Branding", "Photography", "Digital", "Web", "Experiential"],
    visual: img("ind-hosp", 1400, 900),
  },
  {
    slug: "fnb",
    title: "F&B",
    description: "Identity, content, and social systems built for appetite and culture.",
    capabilities: ["Brand Identity", "Social", "Production", "Performance"],
    visual: img("ind-fnb", 1400, 900),
  },
  {
    slug: "retail",
    title: "Retail",
    description: "Commerce experiences and campaigns that convert attention into loyalty.",
    capabilities: ["Digital", "Branding", "Activations", "Performance"],
    visual: img("ind-retail", 1400, 900),
  },
  {
    slug: "corporate",
    title: "Corporate",
    description: "Communications, events, and digital presence with strategic clarity.",
    capabilities: ["Branding", "Communications", "Events", "Digital"],
    visual: img("ind-corp", 1400, 900),
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    description: "Trust-first brand systems and patient journeys that feel human.",
    capabilities: ["Strategy", "Digital", "Web", "Content"],
    visual: img("ind-health", 1400, 900),
  },
  {
    slug: "automotive",
    title: "Automotive",
    description: "Launch films, activations, and digital ecosystems with velocity.",
    capabilities: ["Production", "Events", "Digital", "Performance"],
    visual: img("ind-auto", 1400, 900),
  },
  {
    slug: "startups",
    title: "Startups",
    description: "Positioning, product storytelling, and growth systems from day one.",
    capabilities: ["Strategy", "Branding", "Product", "Growth"],
    visual: img("ind-start", 1400, 900),
  },
];

export const articles: Article[] = [
  {
    slug: "why-most-brands-dont-have-a-marketing-problem",
    title: "Why Most Brands Don’t Have a Marketing Problem",
    excerpt: "They have a clarity problem dressed as a channel problem.",
    category: "marketing",
    coverImage: img("think1", 1600, 1000),
    author: "UNKNOWN",
    date: "2026-03-12",
    content: `Most brands don’t lack ads. They lack a point of view.

When everything looks the same, louder media only accelerates sameness. The real work starts earlier — with positioning, audience truth, and an idea worth repeating.

Channels amplify. They do not invent meaning.

At UNKNOWN, we treat strategy as creative fuel, not a slide deck that dies after kickoff. If the idea isn’t sharp enough to survive a pause in paid spend, it was never a brand idea — it was a campaign cost.`,
    featured: true,
    published: true,
  },
  {
    slug: "from-attention-to-conversion",
    title: "From Attention to Conversion",
    excerpt: "Attention is rented. Conversion is designed.",
    category: "digital",
    coverImage: img("think2", 1600, 1000),
    author: "UNKNOWN",
    date: "2026-02-20",
    content: `Winning the scroll is not the same as winning the decision.

High-performing brands design the path between curiosity and commitment — creative that earns the click, experience that earns the trust, and measurement that earns the next iteration.

We connect creative, media, and product thinking so the journey doesn’t break where teams usually hand off.`,
    featured: false,
    published: true,
  },
  {
    slug: "what-makes-a-brand-memorable",
    title: "What Makes a Brand Memorable?",
    excerpt: "Memory loves contrast, consistency, and courage.",
    category: "branding",
    coverImage: img("think3", 1600, 1000),
    author: "UNKNOWN",
    date: "2026-01-18",
    content: `Memorable brands make a decision and keep it.

They choose a tone, a visual tension, a behavioral signature — then repeat it until the market can finish their sentence.

Trend-chasing feels current. Consistency feels inevitable. Inevitability is what people remember.`,
    featured: true,
    published: true,
  },
  {
    slug: "technology-that-amplifies-ideas",
    title: "Technology That Amplifies Ideas",
    excerpt: "Build tools that serve the story — not the other way around.",
    category: "technology",
    coverImage: img("think4", 1600, 1000),
    author: "UNKNOWN",
    date: "2025-12-04",
    content: `Technology without an idea is infrastructure. An idea without technology is a demo.

The sweet spot is amplification: platforms, automation, and products that make the brand experience smoother, smarter, and more personal at scale.`,
    featured: false,
    published: true,
  },
  {
    slug: "creative-direction-beyond-the-obvious",
    title: "Creative Direction Beyond the Obvious",
    excerpt: "The first idea is usually the industry’s idea.",
    category: "creative",
    coverImage: img("think5", 1600, 1000),
    author: "UNKNOWN",
    date: "2025-11-09",
    content: `Obvious creative is comfortable — and forgettable.

We push past category defaults until the work feels owned by the brand alone. That tension is where recognition lives.`,
    featured: false,
    published: true,
  },
];

export const team: TeamMember[] = [
  {
    id: "1",
    name: "Aya Mansour",
    position: "Creative Director",
    bio: "Shapes brand worlds with editorial precision and cinematic instinct.",
    photo: img("team1", 800, 1000),
    order: 1,
  },
  {
    id: "2",
    name: "Omar Farid",
    position: "Strategy Lead",
    bio: "Turns ambiguity into sharp positioning and measurable plans.",
    photo: img("team2", 800, 1000),
    order: 2,
  },
  {
    id: "3",
    name: "Lina Haddad",
    position: "Head of Digital",
    bio: "Connects media, content, and conversion into one growth system.",
    photo: img("team3", 800, 1000),
    order: 3,
  },
  {
    id: "4",
    name: "Karim Nasser",
    position: "Technology Director",
    bio: "Builds platforms and products that amplify brand experience.",
    photo: img("team4", 800, 1000),
    order: 4,
  },
];

export const clients: Client[] = [
  { id: "1", name: "Aurora", industry: "Real Estate", logo: "/brand/logo-mark.svg" },
  { id: "2", name: "Velvet", industry: "F&B", logo: "/brand/logo-mark.svg" },
  { id: "3", name: "Northline", industry: "Retail", logo: "/brand/logo-mark.svg" },
  { id: "4", name: "Pulse", industry: "Automotive", logo: "/brand/logo-mark.svg" },
  { id: "5", name: "Haven", industry: "Hospitality", logo: "/brand/logo-mark.svg" },
  { id: "6", name: "Clara", industry: "Healthcare", logo: "/brand/logo-mark.svg" },
  { id: "7", name: "Orbit", industry: "Corporate", logo: "/brand/logo-mark.svg" },
  { id: "8", name: "Seedlab", industry: "Startups", logo: "/brand/logo-mark.svg" },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "UNKNOWN didn’t give us another campaign. They gave us a way of thinking that changed how we show up.",
    name: "Sara Elmasry",
    position: "CMO",
    company: "Aurora Developments",
  },
  {
    id: "2",
    quote:
      "Strategy, creative, and technology in one room — rare, and exactly what we needed.",
    name: "Daniel Ruiz",
    position: "Founder",
    company: "Northline",
  },
];

export const siteStats: SiteStat[] = [
  { id: "1", label: "Projects", value: "100+", verified: true, order: 1 },
  { id: "2", label: "Clients", value: "50+", verified: true, order: 2 },
  { id: "3", label: "Years", value: "8", verified: true, order: 3 },
  { id: "4", label: "Industries", value: "12", verified: true, order: 4 },
];

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Brand Designer",
    department: "Creative",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Lead identity systems and visual storytelling across brand and campaigns.",
    open: true,
  },
  {
    id: "2",
    title: "Performance Marketing Manager",
    department: "Digital",
    location: "On-site",
    type: "Full-time",
    description: "Own paid growth strategy across channels with creative collaboration.",
    open: true,
  },
];

export const siteConfig = {
  name: "UNKNOWN Marketing Solution",
  tagline: "Ideas Beyond the Obvious.",
  email: "hello@unknown.agency",
  phone: "+1 (000) 000-0000",
  location: "Your City",
  keywords: [
    "Creative",
    "Smart",
    "Feminine",
    "Strategic",
    "Modern",
    "Trusted",
    "Impactful",
  ],
  colors: {
    charcoal: "#212121",
    sand: "#EBE4DE",
    blush: "#F0DBD6",
    nude: "#BF9990",
    mist: "#B2B2B2",
  },
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
};
