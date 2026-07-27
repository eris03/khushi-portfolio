export const profile = {
  name: "Khushi Yadav",
  roles: ["AI Developer", "Data Analyst", "AI/ML Engineer"],
  tagline: "Designing beautiful intelligence.",
  title: "Computer Science & Engineering (AI & ML) Graduate · AI Developer · Data Analyst",
  location: "Bengaluru, Karnataka, India",
  phone: "+91 9113091662",
  email: "khushi392004yadav@gmail.com",
  linkedin: "https://linkedin.com/in/khudav03",
  github: "https://github.com/eris03",
  summary:
    "Computer Science (AI & ML) graduate from VTU with an 8.3 CGPA, currently working as an AI Developer at RK Developers, where I've shipped Android apps, company websites, and internal data tooling end to end. The last two years have mostly been hands-on data and AI work — Python, SQL, Advanced Excel, Power BI, and scikit-learn — plus a live LLM application I built and deployed myself, iterating on prompts until accuracy crossed 90% on real queries. Google-certified in Analytics and Cloud, and available for immediate joining.",
};

export type Chapter = {
  id: string;
  year: string;
  title: string;
  place: string;
  note: string;
  detail: string;
  hue: string;
};

export const chapters: Chapter[] = [
  {
    id: "school",
    year: "2020 — 2022",
    title: "The Sketchbook Years",
    place: "Army Public School, Bangalore",
    note: "Class X · 88%  ·  Class XII · 80%",
    detail:
      "Before there was code, there were drawings. Margins full of them. CBSE syllabus on one page, a half-finished face on the next — the habit of noticing detail started here.",
    hue: "#FFD6E8",
  },
  {
    id: "engineering",
    year: "2022 — 2026",
    title: "Learning the Machine",
    place: "Vijaya Vittala Institute of Technology, VTU",
    note: "B.E. CSE (AI & ML) · CGPA 8.3 / 10",
    detail:
      "Four years of turning intuition into systems. Python, statistics, data structures, then the AI & ML specialisation — and the slow realisation that a neural network is just another way of describing something you already knew how to see.",
    hue: "#DCCBFF",
  },
  {
    id: "certs",
    year: "2025 — 2026",
    title: "Sharpening the Tools",
    place: "Google · Microsoft · Salesforce · Pragyan AI",
    note: "Analytics, Cloud, Power BI, Azure, GenAI",
    detail:
      "Google Analytics Certified Professional. Prompt Design in Agent Platform. Power BI and Azure through Microsoft. Super 30 for Data Science & GenAI. 710 points of Google Cloud labs — Silver League.",
    hue: "#CFE8FF",
  },
  {
    id: "internship",
    year: "Feb — May 2026",
    title: "Where GenAI Clicked",
    place: "MindMatrix · VTU MoU Partner",
    note: "Android Development Intern · Rated Excellent",
    detail:
      "Kotlin, Google AI Studio, Cloud Labs. Owned UI, feature development, debugging and Firebase auth across sprints — every sprint ending in working, tested code. This is the one where generative AI stopped being a topic and became a tool.",
    hue: "#CFF5E7",
  },
  {
    id: "rk",
    year: "Feb 2026 — Present",
    title: "Shipping, For Real",
    place: "RK Developers, Bengaluru",
    note: "AI Developer · Full-time",
    detail:
      "Two Android apps and two company websites shipped end to end, UI design through deployment. Internal dashboards around app usage and attendance. LLM APIs and prompt engineering folded into products that people actually use.",
    hue: "#FFD8BE",
  },
  {
    id: "future",
    year: "Next",
    title: "The Island Still Being Drawn",
    place: "Open to what's next",
    note: "Available for immediate joining",
    detail:
      "Looking for a team where creative instinct is treated as an engineering asset — where the person building the model is also allowed to care what it looks like.",
    hue: "#F8C8DC",
  },
];

export type Skill = {
  name: string;
  group: "Language" | "Data" | "AI/ML" | "Mobile" | "Cloud";
  level: number;
  years: string;
  used: string;
  color: string;
};

export const skills: Skill[] = [
  { name: "Python", group: "Language", level: 95, years: "4 yrs", used: "DemandSense · Chatbot · Recommender", color: "#F7AFC9" },
  { name: "SQL", group: "Data", level: 88, years: "3 yrs", used: "Internal dashboards at RK", color: "#DCCBFF" },
  { name: "Machine Learning", group: "AI/ML", level: 88, years: "3 yrs", used: "Forecasting · Recommenders", color: "#CFE8FF" },
  { name: "Prompt Engineering", group: "AI/ML", level: 92, years: "2 yrs", used: "LLM Chatbot · 90%+ accuracy", color: "#FFD6E8" },
  { name: "LLM Integration", group: "AI/ML", level: 90, years: "2 yrs", used: "Product AI features at RK", color: "#CFF5E7" },
  { name: "Power BI", group: "Data", level: 85, years: "2 yrs", used: "Attendance & usage reporting", color: "#FFD8BE" },
  { name: "Advanced Excel", group: "Data", level: 90, years: "3 yrs", used: "PivotTables · Power Query", color: "#F8C8DC" },
  { name: "Kotlin", group: "Mobile", level: 84, years: "2 yrs", used: "MindMatrix · FieldTrack Pro", color: "#DCCBFF" },
  { name: "Jetpack Compose", group: "Mobile", level: 80, years: "2 yrs", used: "Two shipped Android apps", color: "#CFE8FF" },
  { name: "Firebase", group: "Mobile", level: 82, years: "2 yrs", used: "Auth · Realtime data", color: "#FFD6E8" },
  { name: "scikit-learn", group: "AI/ML", level: 86, years: "3 yrs", used: "Gradient boosting · similarity", color: "#CFF5E7" },
  { name: "Pandas / NumPy", group: "Data", level: 92, years: "3 yrs", used: "Every project, always", color: "#FFD8BE" },
  { name: "Streamlit", group: "AI/ML", level: 85, years: "2 yrs", used: "DemandSense dashboard", color: "#F7AFC9" },
  { name: "React", group: "Language", level: 78, years: "2 yrs", used: "Chatbot frontend · websites", color: "#F8C8DC" },
  { name: "Google Cloud", group: "Cloud", level: 80, years: "2 yrs", used: "Silver League · 710 pts", color: "#CFE8FF" },
  { name: "Git & GitHub", group: "Cloud", level: 88, years: "3 yrs", used: "10+ shipped repositories", color: "#DCCBFF" },
];

export type Project = {
  id: string;
  name: string;
  kind: string;
  blurb: string;
  problem: string;
  solution: string;
  challenge: string;
  result: string;
  tech: string[];
  github: string;
  live?: string;
  palette: [string, string, string];
  visual: "forecast" | "movies" | "chat" | "map" | "rag" | "shield";
  /**
   * Drop a real screenshot at this path in /public and it replaces the animated
   * artwork automatically. Leave undefined and the animation is used instead.
   * e.g. "/projects/demandsense.png"
   */
  image?: string;
  /** Extra screenshots shown inside the project modal. */
  gallery?: string[];
  /** Measured numbers, shown as animated stat blocks inside the modal. */
  metrics?: { value: string; label: string; note?: string }[];
};

export const projects: Project[] = [
  {
    id: "chatbot",
    name: "LLM-Powered Chatbot",
    kind: "FastAPI × React × LLM APIs · Live",
    blurb: "Built it, deployed it, then argued with the prompt until it got the answers right.",
    problem:
      "A generic LLM wrapper answers plausibly and confidently, and is wrong often enough to be useless. Out of the box, real user queries were landing well below acceptable accuracy.",
    solution:
      "A Python FastAPI backend calling an LLM API, with a React frontend, deployed live. The real substance is the prompt architecture — structured context, constrained output shape, and explicit fallback behaviour when the model isn't sure.",
    challenge:
      "Iteration with no shortcuts. I rewrote the prompts myself, over and over, testing against real user queries rather than curated examples, until accuracy crossed 90%.",
    result: "A live application answering real queries at 90%+ accuracy — measured, not assumed.",
    tech: ["Python", "FastAPI", "React", "JavaScript", "LLM APIs", "Prompt Engineering"],
    github: "https://github.com/eris03/llm-chatbot",
    palette: ["#CFF5E7", "#CFE8FF", "#DCCBFF"],
    visual: "chat",
    metrics: [
      { value: "90%+", label: "accuracy on real queries", note: "measured against production traffic, not curated examples" },
      { value: "Live", label: "deployed and running", note: "FastAPI backend, React frontend" },
      { value: "Many", label: "prompt iterations", note: "rewritten by hand until the numbers moved" },
    ],
    image: "/projects/chatbot.png",
    gallery: ["/projects/chatbot.png", "/projects/chatbot-2.png"],
  },
  {
    id: "rag",
    name: "RAG Q&A Demo",
    kind: "Retrieval-Augmented Q&A · Runs with no API key",
    blurb: "Answers questions with its sources attached — and costs nothing to run.",
    problem:
      "An LLM asked about a specific document set will answer confidently from its training data instead, with no way for the reader to check it. For anything factual, an answer without a citation is close to worthless.",
    solution:
      "A retrieval-augmented pipeline: sentence-transformers embed the corpus, FAISS handles vector search, a FastAPI service assembles the retrieved context, and a React frontend shows every answer alongside the passages it came from.",
    challenge:
      "Making it free to run. Using local sentence-transformer embeddings instead of a hosted embedding API means anyone can clone it and try it with no key and no bill — which matters far more for a demo than shaving a few points off retrieval quality.",
    result: "A working RAG system anyone can run locally, where every answer is traceable back to a cited source.",
    tech: ["Python", "FastAPI", "sentence-transformers", "FAISS", "React", "RAG"],
    github: "https://github.com/eris03/rag-qa-demo",
    palette: ["#DCCBFF", "#CFE8FF", "#CFF5E7"],
    visual: "rag",
    metrics: [
      { value: "Cited", label: "sources on every answer", note: "retrieved passages shown next to the response" },
      { value: "No API key", label: "free to run", note: "local sentence-transformer embeddings" },
      { value: "FAISS", label: "vector search", note: "similarity search over the embedded corpus" },
    ],
    image: "/projects/rag.png",
    gallery: ["/projects/rag.png", "/projects/rag-2.png"],
  },
  {
    id: "support",
    name: "AI Support Agent",
    kind: "Conversational AI · Hybrid Retrieval",
    blurb: "Knows when it isn't sure — and hands the conversation to a human before it makes things worse.",
    problem:
      "Support bots fail in two directions: pure semantic search misses exact product codes and error strings, while pure keyword search misses anyone who phrases a problem in their own words. And both will keep guessing at a frustrated customer rather than escalating.",
    solution:
      "Hybrid retrieval combining semantic embeddings with BM25 keyword scoring, so precise terms and natural phrasing both land. Every response carries a confidence score, sentiment analysis reads the customer's tone, and low confidence or rising frustration triggers automatic escalation to a person.",
    challenge:
      "Tuning the escalation threshold. Too eager and it hands off everything, which defeats the purpose; too reluctant and it argues with an angry customer. Confidence and sentiment together turned out to be a far better trigger than either alone.",
    result: "A support agent that resolves what it can and knows the boundary of what it can't.",
    tech: ["Python", "NLP", "BM25", "Embeddings", "Sentiment Analysis", "LLM APIs"],
    github: "https://github.com/eris03/ai-support-agent",
    palette: ["#FFD6E8", "#DCCBFF", "#CFE8FF"],
    visual: "chat",
    metrics: [
      { value: "Hybrid", label: "semantic + BM25 search", note: "exact codes and natural phrasing both retrieved" },
      { value: "Scored", label: "confidence on every reply", note: "drives the escalation decision" },
      { value: "Auto", label: "escalation to a human", note: "triggered by low confidence or negative sentiment" },
    ],
    image: "/projects/support.png",
    gallery: ["/projects/support.png", "/projects/support-2.png"],
  },
  {
    id: "guardrails",
    name: "LLM Guardrails",
    kind: "LLM Safety & Security",
    blurb: "The unglamorous layer that stops a clever prompt from walking off with your system prompt.",
    problem:
      "Anything you ship on top of an LLM is one crafted message away from ignoring its instructions, leaking its system prompt, or returning something you'd never want attached to your product.",
    solution:
      "A lightweight two-sided guard: input screening that flags prompt-injection patterns before they reach the model, and output guardrails that validate what comes back against expected shape and content rules before it reaches the user.",
    challenge:
      "Staying lightweight. Guardrails that add latency or block legitimate questions get switched off by whoever is on call. The value is in catching the obvious attacks cheaply, not in pretending to be a complete defence.",
    result: "A small, embeddable safety layer for LLM applications — the part most portfolios skip entirely.",
    tech: ["Python", "LLM Safety", "Prompt Injection Detection", "Input Validation"],
    github: "https://github.com/eris03/llm-guardrails",
    palette: ["#CFF5E7", "#FFD8BE", "#DCCBFF"],
    visual: "shield",
    metrics: [
      { value: "Two-sided", label: "input and output checks", note: "screened before the model and before the user" },
      { value: "Injection", label: "detection patterns", note: "catches the common attack shapes cheaply" },
      { value: "Lightweight", label: "built to stay switched on", note: "negligible latency, few false positives" },
    ],
    image: "/projects/guardrails.png",
    gallery: ["/projects/guardrails.png", "/projects/guardrails-2.png"],
  },
  {
    id: "sales",
    name: "Sales Analytics Dashboard",
    kind: "Business Intelligence · Streamlit + Plotly",
    blurb: "Six thousand orders, turned into something a manager can actually act on.",
    problem:
      "Six thousand order records in a spreadsheet is not insight. Anyone wanting to know how a region performed last quarter was rebuilding the same pivot table from scratch every time they asked.",
    solution:
      "An interactive Streamlit dashboard with Plotly visuals: live KPIs across the whole order book, filters that slice by the dimensions people actually ask about, and trend analysis that makes direction of travel obvious at a glance.",
    challenge:
      "Deciding what to leave out. The temptation with 6,000 rows is to chart everything; the useful version answers the four or five questions people genuinely repeat and makes those instant.",
    result: "A self-serve BI dashboard over 6,000 orders — no more rebuilding the same analysis by hand.",
    tech: ["Python", "Streamlit", "Plotly", "Pandas", "Data Visualisation"],
    github: "https://github.com/eris03/sales-analytics-dashboard",
    palette: ["#FFD8BE", "#F8C8DC", "#CFE8FF"],
    visual: "forecast",
    metrics: [
      { value: "6,000", label: "orders analysed", note: "the full order book, not a sample" },
      { value: "Live", label: "KPIs and filters", note: "slice by the dimensions people actually ask about" },
      { value: "Trends", label: "direction at a glance", note: "the question managers repeat most" },
    ],
    image: "/projects/sales.png",
    gallery: ["/projects/sales.png", "/projects/sales-2.png"],
  },
  {
    id: "fieldtrack",
    name: "FieldTrack Pro",
    kind: "Attendance Tracking App · In Production",
    blurb: "GPS, selfie punch-in, task categories — and an admin dashboard that hands managers their own data.",
    problem:
      "Field attendance at RK Developers was trust-based and unverifiable. Managers had no way to confirm where someone was, and no way to pull a record without asking someone else for it.",
    solution:
      "An Android app with GPS-verified, selfie-confirmed punch-in and task categorisation, backed by Firebase. Paired with an admin dashboard so managers can pull and analyse records themselves rather than filing a request.",
    challenge:
      "Making verification feel like a two-second action instead of surveillance. The punch-in flow had to be fast enough that people didn't resent it, and strict enough that the record meant something.",
    result: "Live and in daily use at RK Developers — one of four projects of mine currently in production.",
    tech: ["TypeScript", "Kotlin", "Firebase", "Android", "GPS"],
    github: "https://github.com/eris03/fieldtrack-pro",
    palette: ["#CFE8FF", "#CFF5E7", "#FFD6E8"],
    visual: "map",
    metrics: [
      { value: "In use", label: "daily at RK Developers", note: "one of four projects live today" },
      { value: "GPS + selfie", label: "verified punch-in", note: "fast enough that people do not resent it" },
      { value: "Self-serve", label: "admin dashboard", note: "managers pull their own records" },
    ],
    image: "/projects/fieldtrack.png",
    gallery: ["/projects/fieldtrack.png", "/projects/fieldtrack-2.png"],
  },
  {
    id: "demandsense",
    name: "DemandSense",
    kind: "Retail Forecasting & Anomaly Detection",
    blurb: "Multi-store demand forecasting that picks its own model — and tells the manager what it found.",
    problem:
      "Retail managers were reacting to stock problems after they happened. Demand across multiple stores moved in patterns nobody had time to read, and one bad week looked identical to a genuine trend shift.",
    solution:
      "A forecasting engine that runs Holt-Winters and gradient boosting side by side, backtests both, and auto-selects the winner per store. Rolling-MAD anomaly detection flags the weeks that don't belong, and the whole thing writes an auto-generated manager briefing in plain English on top.",
    challenge:
      "Getting the anomaly detector to stop screaming. Rolling median-absolute-deviation with a tuned window turned out to be far more forgiving of seasonal spikes than a naive z-score — it flags what's genuinely odd, not what's merely busy.",
    result:
      "A Streamlit dashboard a non-technical manager can open and act on, with model selection justified by backtest score rather than by preference.",
    tech: ["Python", "scikit-learn", "statsmodels", "Streamlit", "Pandas"],
    github: "https://github.com/eris03/DemandSense",
    palette: ["#FFD6E8", "#DCCBFF", "#CFE8FF"],
    visual: "forecast",
    metrics: [
      { value: "2", label: "models backtested", note: "Holt-Winters vs. gradient boosting, auto-selected per store" },
      { value: "Multi", label: "store forecasting", note: "one pipeline across every location" },
      { value: "Rolling MAD", label: "anomaly detection", note: "tuned window, far fewer false alarms than z-score" },
    ],
    image: "/projects/demandsense.png",
    gallery: ["/projects/demandsense.png", "/projects/demandsense-2.png"],
  },
  {
    id: "movies",
    name: "Movie Recommendation System",
    kind: "Content-Based Recommender · NLP",
    blurb: "A recommender where most of the work was invisible — and that's the point.",
    problem:
      "Content-based recommenders are easy to build and hard to make good. Cosine similarity on a messy feature set returns technically-correct suggestions that feel completely wrong to a human.",
    solution:
      "Similarity scoring over engineered text features — genres, keywords, cast, crew — vectorised and tuned. The recommendation logic is a few lines; the feature pipeline underneath it is most of the project.",
    challenge:
      "Dataset cleaning. Nested JSON fields, inconsistent naming, duplicate titles across years. The suggestions only started feeling relevant after the features were genuinely clean.",
    result:
      "Recommendations that pass the human test — you look at the list and think yes, that's what I'd want next.",
    tech: ["Python", "scikit-learn", "NLP", "Pandas"],
    github: "https://github.com/eris03/movie-recommendation-system",
    palette: ["#FFD8BE", "#F8C8DC", "#DCCBFF"],
    visual: "movies",
    metrics: [
      { value: "Content-based", label: "recommender", note: "similarity scoring over engineered text features" },
      { value: "4+", label: "feature families", note: "genres, keywords, cast, crew" },
      { value: "Most of it", label: "spent on cleaning", note: "nested JSON, duplicate titles, inconsistent naming" },
    ],
    image: "/projects/movies.png",
    gallery: ["/projects/movies.png", "/projects/movies-2.png"],
  },
];

export type Station = {
  id: string;
  role: string;
  org: string;
  period: string;
  meta: string;
  bullets: string[];
  color: string;
};

export const stations: Station[] = [
  {
    id: "mindmatrix",
    role: "Android App Development Intern",
    org: "MindMatrix · VTU MoU Partner",
    period: "Feb 2026 — May 2026",
    meta: "Online Internship · Rated Excellent",
    bullets: [
      "Built Android apps in Kotlin, working hands-on with Google AI Studio and Cloud Labs — the internship where generative AI really clicked into place.",
      "Owned UI, feature development, debugging and Firebase auth across sprints, with every sprint ending in working, tested code.",
    ],
    color: "#DCCBFF",
  },
  {
    id: "rkdev",
    role: "AI Developer",
    org: "RK Developers, Bengaluru",
    period: "Feb 2026 — Present",
    meta: "Full-time · Reporting to the engineering lead",
    bullets: [
      "Shipped two Android apps and two company websites end to end, owning everything from UI design to deployment.",
      "Built internal dashboards and data tooling around app usage and attendance records — turning raw data into something the team could actually read and act on.",
      "Added AI features into the products using LLM APIs and prompt engineering, keeping the builds practical rather than just experimental.",
    ],
    color: "#F7AFC9",
  },
  {
    id: "next",
    role: "The Next Station",
    org: "Currently open",
    period: "Available immediately",
    meta: "Let's find out together",
    bullets: [
      "Looking for work where the creative and the technical aren't treated as separate departments.",
    ],
    color: "#CFF5E7",
  },
];

export type Cert = {
  name: string;
  issuer: string;
  date: string;
  back: string;
  color: string;
};

export const certs: Cert[] = [
  {
    name: "Google Analytics Certified Professional",
    issuer: "Google",
    date: "Sep 2025",
    back: "The full analytics stack — measurement planning, data collection, reporting, and reading a funnel without lying to yourself about it.",
    color: "#FFD6E8",
  },
  {
    name: "Prompt Design in Agent Platform",
    issuer: "Google Cloud Skills Boost",
    date: "May 2026",
    back: "Structured prompt architecture for agentic systems — the formal version of what I'd already been doing by hand on the chatbot.",
    color: "#DCCBFF",
  },
  {
    name: "Prepare Data for Analysis with Power BI",
    issuer: "Microsoft",
    date: "Aug 2025",
    back: "Power Query, shaping, and the unglamorous cleaning work that decides whether a dashboard is trustworthy.",
    color: "#CFE8FF",
  },
  {
    name: "Introduction to Microsoft Azure & Data Analysis",
    issuer: "Microsoft",
    date: "Aug 2025",
    back: "Cloud fundamentals on Azure alongside the data-analysis discovery track — a second cloud to sit beside GCP.",
    color: "#CFF5E7",
  },
  {
    name: "Data Science, AI & GenAI — Super 30",
    issuer: "Pragyan AI",
    date: "2026",
    back: "A selective 30-person intensive across data science, applied AI and generative AI systems.",
    color: "#FFD8BE",
  },
  {
    name: "Agent Blazer",
    issuer: "Salesforce Trailhead",
    date: "2026",
    back: "Agentforce and autonomous agent design on the Salesforce platform — a different vendor's take on the same agentic ideas.",
    color: "#F8C8DC",
  },
];

export type Trophy = {
  title: string;
  metric: string;
  detail: string;
  color: string;
};

export const trophies: Trophy[] = [
  {
    title: "Google Cloud Silver League",
    metric: "710 pts",
    detail:
      "710 points earned across Google Cloud Skills Boost labs — hands-on infrastructure, data and AI work rather than watched lectures.",
    color: "#DCCBFF",
  },
  {
    title: "Projects Shipped",
    metric: "10+",
    detail:
      "Ten-plus independent projects built end to end. Four of them are live and in use today, including FieldTrack Pro at RK Developers.",
    color: "#F8C8DC",
  },
  {
    title: "Chatbot Accuracy",
    metric: "90%+",
    detail:
      "Iterated prompts personally on a live LLM application until accuracy crossed 90% on real user queries — measured against production traffic.",
    color: "#CFF5E7",
  },
  {
    title: "Technical Events Lead",
    metric: "300+",
    detail:
      "Led the technical events for the college fest — coordinating 20+ volunteers to run events for 300+ participants.",
    color: "#FFD8BE",
  },
];

export const artWords = ["Sketching", "Colour", "Composition", "Intuition", "Storytelling", "Watercolour"];
export const aiWords = ["Python", "Gradient Boosting", "Embeddings", "Backtesting", "Transformers", "Inference"];
