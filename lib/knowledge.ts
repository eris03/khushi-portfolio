/**
 * Knowledge base for the "Ask about my work" widget.
 *
 * This runs entirely in the browser — no API key, no server, nothing to leak,
 * and no cost. Questions are matched against the keyword sets below and the
 * best-scoring entry is returned.
 *
 * To upgrade it to a real LLM later, see `answerFor()` at the bottom: swap the
 * retrieval call for a fetch to your own endpoint and keep everything else.
 */

export type Entry = {
  id: string;
  /** Words that pull a question toward this answer. Order doesn't matter. */
  keys: string[];
  answer: string;
  /** Optional follow-up chips shown under the answer. */
  followUps?: string[];
};

export const SUGGESTIONS = [
  "What does she do right now?",
  "Has she shipped anything to production?",
  "How strong is her Python?",
  "Tell me about the LLM chatbot",
  "Is she available to join?",
];

export const KNOWLEDGE: Entry[] = [
  {
    id: "current",
    keys: ["current", "now", "currently", "doing", "job", "role", "work", "where", "employed", "rk", "developers", "today"],
    answer:
      "She's an AI Developer at RK Developers in Bengaluru — a paid, full-time role reporting to the engineering lead. Since joining in February 2026 she's shipped two Android apps and two company websites end to end, owning everything from UI design through deployment, plus internal dashboards around app usage and attendance records.",
    followUps: ["What did she build there?", "Is she available to join?"],
  },
  {
    id: "production",
    keys: ["production", "live", "shipped", "real", "deployed", "users", "actually", "used", "proof", "evidence"],
    answer:
      "Yes — four projects are live and in use today out of 10+ built end to end. FieldTrack Pro runs daily at RK Developers for field attendance, and the LLM chatbot is deployed and answering real user queries at 90%+ accuracy. The two Android apps and two company websites she shipped at RK are also in production. Alongside those: a RAG Q&A system, an AI support agent, an LLM guardrails layer and a sales BI dashboard.",
    followUps: ["Tell me about FieldTrack Pro", "Tell me about the RAG demo"],
  },
  {
    id: "python",
    keys: ["python", "programming", "language", "code", "coding", "strong", "best", "skill"],
    answer:
      "Python is her strongest language — about four years, and it's the backbone of every project here: the DemandSense forecasting engine (scikit-learn, statsmodels, Streamlit), the content-based movie recommender, and the FastAPI backend behind the live chatbot. Alongside it: SQL, C, C++ and Kotlin.",
    followUps: ["What about data tools?", "Tell me about DemandSense"],
  },
  {
    id: "chatbot",
    keys: ["chatbot", "llm", "chat", "bot", "gpt", "prompt", "fastapi", "accuracy", "90"],
    answer:
      "A Python FastAPI backend calling an LLM API with a React frontend, deployed live. The substance is the prompt architecture — structured context, constrained output shape, explicit fallback when the model isn't sure. She rewrote the prompts herself against real user queries, not curated examples, until accuracy crossed 90%. That number is measured, not assumed.",
    followUps: ["Has she shipped anything to production?", "What's her prompt engineering like?"],
  },
  {
    id: "demandsense",
    keys: ["demandsense", "forecast", "forecasting", "retail", "anomaly", "timeseries", "time", "series", "holt", "winters", "boosting"],
    answer:
      "DemandSense is multi-store retail demand forecasting. It runs Holt-Winters and gradient boosting side by side, backtests both, and auto-selects the winner per store — so model choice is justified by score, not preference. Rolling-MAD anomaly detection flags weeks that don't belong, and it auto-generates a plain-English manager briefing on top.",
    followUps: ["How strong is her Python?", "What about data tools?"],
  },
  {
    id: "fieldtrack",
    keys: ["fieldtrack", "attendance", "android", "app", "mobile", "gps", "firebase", "kotlin", "tracking"],
    answer:
      "FieldTrack Pro is a field attendance app built for RK Developers — GPS-verified, selfie-confirmed punch-in with task categories, backed by Firebase, plus an admin dashboard so managers pull and analyse records themselves. It's live and in daily use. The design challenge was making verification a two-second action rather than something that felt like surveillance.",
    followUps: ["Has she shipped anything to production?", "What does she do right now?"],
  },
  {
    id: "rag",
    keys: ["rag", "retrieval", "augmented", "faiss", "vector", "embedding", "citation", "cited", "source", "qa"],
    answer:
      "The RAG Q&A Demo is a retrieval-augmented question-answering system — sentence-transformers for embeddings, FAISS for vector search, a FastAPI service assembling context, and a React frontend that shows every answer next to the passages it came from. Deliberately built to run with no API key, using local embeddings, so anyone can clone it and try it for free.",
    followUps: ["Tell me about the AI Support Agent", "What's her prompt engineering like?"],
  },
  {
    id: "support",
    keys: ["support", "agent", "customer", "bm25", "hybrid", "sentiment", "escalation", "escalate", "confidence", "conversational"],
    answer:
      "The AI Support Agent combines semantic embeddings with BM25 keyword scoring, so exact product codes and natural phrasing both retrieve correctly. Every reply carries a confidence score, sentiment analysis reads the customer's tone, and low confidence or rising frustration triggers automatic escalation to a human. The interesting engineering was tuning that escalation threshold.",
    followUps: ["Tell me about the RAG demo", "Tell me about the LLM chatbot"],
  },
  {
    id: "guardrails",
    keys: ["guardrail", "guardrails", "safety", "security", "injection", "jailbreak", "attack", "validation", "secure"],
    answer:
      "LLM Guardrails is a lightweight two-sided safety layer: input screening that flags prompt-injection patterns before they reach the model, and output validation that checks responses against expected shape and content before they reach the user. Built to stay lightweight on purpose — guardrails that add latency or block legitimate questions get switched off.",
    followUps: ["What's her prompt engineering like?", "Has she shipped anything to production?"],
  },
  {
    id: "sales",
    keys: ["sale", "dashboard", "bi", "business", "intelligence", "streamlit", "plotly", "kpi", "order", "6000", "visualisation", "visualization"],
    answer:
      "The Sales Analytics Dashboard is interactive BI over 6,000 orders — Streamlit and Plotly, with live KPIs, filters that slice by the dimensions people actually ask about, and trend analysis. The design decision was what to leave out: it answers the four or five questions managers genuinely repeat, instantly, rather than charting everything.",
    followUps: ["What about data tools?", "Tell me about DemandSense"],
  },
  {
    id: "movies",
    keys: ["movie", "recommender", "recommendation", "nlp", "similarity", "content"],
    answer:
      "A content-based movie recommender using similarity scoring over engineered text features — genres, keywords, cast, crew. The recommendation logic is a few lines; the feature pipeline underneath is most of the project. Most of the time went into cleaning nested JSON, inconsistent naming and duplicate titles until the suggestions actually felt right to a human.",
    followUps: ["How strong is her Python?", "Tell me about DemandSense"],
  },
  {
    id: "data",
    keys: ["data", "analyst", "analytics", "sql", "excel", "power", "bi", "tableau", "pandas", "numpy", "dashboard", "cleaning"],
    answer:
      "Two years of hands-on data work: Python, SQL, Advanced Excel (PivotTables, VLOOKUP, Power Query), Power BI, Tableau, Pandas and NumPy. At RK she built internal dashboards around app usage and attendance, turning raw records into something the team could read and act on. She's Google Analytics Certified and Microsoft-certified in Power BI data prep.",
    followUps: ["What certifications does she hold?", "What does she do right now?"],
  },
  {
    id: "ml",
    keys: ["ml", "machine", "learning", "ai", "model", "scikit", "sklearn", "genai", "generative", "neural"],
    answer:
      "scikit-learn, NLP, time-series analysis, LLM integration, generative AI and prompt engineering. Applied rather than theoretical — gradient boosting and Holt-Winters in DemandSense, similarity models in the recommender, and LLM APIs folded into products at RK. Her degree is B.E. Computer Science with the AI & ML specialisation, 8.3 CGPA.",
    followUps: ["Tell me about the LLM chatbot", "What certifications does she hold?"],
  },
  {
    id: "prompt",
    keys: ["prompt", "engineering", "prompts", "context", "agent"],
    answer:
      "Prompt engineering is one of her strongest areas — about two years. She's Google Cloud certified in Prompt Design in Agent Platform, and she took the live chatbot past 90% accuracy by hand-iterating prompts against real traffic. At RK she uses LLM APIs and prompt engineering to add AI features to shipped products.",
    followUps: ["Tell me about the LLM chatbot", "Has she shipped anything to production?"],
  },
  {
    id: "education",
    keys: ["education", "degree", "college", "university", "vtu", "cgpa", "gpa", "study", "studied", "school", "graduate", "graduation"],
    answer:
      "B.E. in Computer Science & Engineering with the AI & ML specialisation from Vijaya Vittala Institute of Technology, VTU Bangalore — graduated May 2026 with an 8.3/10 CGPA. Before that, Army Public School Bangalore: 80% in Class XII and 88% in Class X, both CBSE.",
    followUps: ["What certifications does she hold?", "Is she available to join?"],
  },
  {
    id: "certs",
    keys: ["certification", "certifications", "certificate", "certified", "google", "microsoft", "azure", "salesforce", "cloud", "course"],
    answer:
      "Google Analytics Certified Professional (Sep 2025), Prompt Design in Agent Platform via Google Cloud (May 2026), Power BI data prep and Introduction to Microsoft Azure (Aug 2025), Data Science / AI / GenAI through the selective Super 30 programme at Pragyan AI, and Agent Blazer on Salesforce Trailhead. She also reached Google Cloud Silver League with 710 points of hands-on labs.",
    followUps: ["What are her achievements?", "What about data tools?"],
  },
  {
    id: "internship",
    keys: ["internship", "intern", "mindmatrix", "experience", "past", "previous"],
    answer:
      "She interned at MindMatrix, a VTU MoU partner, from February to May 2026 — building Android apps in Kotlin and working hands-on with Google AI Studio and Cloud Labs. She owned UI, feature development, debugging and Firebase auth across sprints, each sprint ending in working, tested code. Rated Excellent. She describes it as the point where generative AI stopped being a topic and became a tool.",
    followUps: ["What does she do right now?", "Has she shipped anything to production?"],
  },
  {
    id: "achievements",
    keys: ["achievement", "achievements", "award", "leadership", "lead", "fest", "volunteers", "silver", "league", "710"],
    answer:
      "Google Cloud Silver League at 710 points from hands-on labs. 10+ independent projects built end to end, four live today. 90%+ measured accuracy on the deployed LLM application. And Technical Events Lead for the college fest — coordinating 20+ volunteers to run events for 300+ participants.",
    followUps: ["Has she shipped anything to production?", "What certifications does she hold?"],
  },
  {
    id: "availability",
    keys: ["available", "availability", "join", "joining", "hire", "hiring", "notice", "start", "when", "open", "relocate", "location", "where", "based"],
    answer:
      "Available for immediate joining, based in Bengaluru, Karnataka. She's looking for a team where creative instinct is treated as an engineering asset. The fastest way to reach her is the contact form on this page or khushi392004yadav@gmail.com — she replies quickly.",
    followUps: ["What does she do right now?", "How do I contact her?"],
  },
  {
    id: "contact",
    keys: ["contact", "email", "reach", "phone", "linkedin", "github", "hire", "message", "talk"],
    answer:
      "Email khushi392004yadav@gmail.com, phone +91 9113091662, LinkedIn at in/khudav03, GitHub at eris03. The contact form at the bottom of this page goes straight to her inbox.",
    followUps: ["Is she available to join?"],
  },
  {
    id: "art",
    keys: ["art", "artist", "draw", "drawing", "design", "creative", "creativity", "hobby", "sketch", "ui"],
    answer:
      "She draws — and has since long before the code. It's not a side note: the same habit of noticing why something works drives how she cleans a dataset and designs an interface. At RK she owns UI design through deployment, so the creative and technical sides aren't separate departments in her work.",
    followUps: ["What does she do right now?", "How strong is her Python?"],
  },
];

/** Very small stemmer — enough to match "forecasting" to "forecast". */
function normalise(q: string) {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/(ing|ed|es|s)$/, ""));
}

const STOP = new Set(["what", "who", "how", "is", "her", "she", "the", "a", "an", "does", "do", "did", "about", "of", "for", "in", "on", "to", "and", "with", "tell", "me", "you", "your"]);

/**
 * Retrieval over KNOWLEDGE. Returns the best entry, or null when nothing scores.
 *
 * TO USE A REAL LLM INSTEAD: make this async and POST the question plus
 * `profile`/`projects` from lib/data.ts to your own serverless endpoint that
 * holds the API key. Never put an API key in this file — it ships to the browser.
 */
export function answerFor(question: string): Entry | null {
  const words = normalise(question).filter((w) => !STOP.has(w));
  if (!words.length) return null;

  let best: Entry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const key of entry.keys) {
      const k = key.replace(/(ing|ed|es|s)$/, "");
      for (const w of words) {
        if (w === k) score += 3;
        else if (w.length > 3 && (w.startsWith(k) || k.startsWith(w))) score += 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 2 ? best : null;
}

export const FALLBACK =
  "I don't have that one written down. Try asking about her current role, the projects (DemandSense, the LLM chatbot, FieldTrack Pro, the recommender), her skills, certifications, or availability — or email her directly at khushi392004yadav@gmail.com.";
