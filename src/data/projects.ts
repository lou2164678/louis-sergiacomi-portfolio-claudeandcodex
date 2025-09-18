export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  image: string;
  livePath: string;
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: "AI Sales Toolkit Platform",
    category: "Sales Enablement",
    description:
      "Unified workspace that brings together AI-powered battlecards, discovery tools, and revenue insights for high-performing GTM teams.",
    longDescription:
      "The AI Sales Toolkit is a full-stack platform I designed to showcase how modern revenue teams can operationalize generative AI. Built with a Next.js app that lives alongside this portfolio, it centralizes competitive battlecards, meeting prep insights, and objection handling intelligence in one environment. Recruiters can launch the app directly from my portfolio to experience the workflow I envision for AI-assisted sellers.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI APIs", "Edge Functions"],
    features: [
      "Modular app architecture with dedicated workspaces for briefs, ICP scoring, and objection handling",
      "API layer built around OpenAI and vector search helpers for real-time enablement",
      "Responsive UI optimized for sales reps on the go",
      "Deployable as a standalone product but linked directly from my portfolio",
    ],
    image: "/placeholder.jpg",
    livePath: "/apps/sales-toolkit",
  },
  {
    id: 2,
    title: "Autobrief Generator",
    category: "AI Workflow Automation",
    description:
      "Creates tailored discovery briefs by blending uploaded collateral with live market intelligence in seconds.",
    longDescription:
      "The Autobrief Generator is a focused experience within the AI Sales Toolkit that demonstrates how I bridge sales methodology with AI orchestration. Users can explore how a rep uploads call notes, enriches them with third-party research, and produces a structured brief ready for outreach. The flow highlights prompt engineering, data sanitation, and guardrails I use when shipping AI into revenue orgs.",
    technologies: ["Next.js App Router", "Server Actions", "OpenAI", "TypeScript"],
    features: [
      "Step-by-step interface guiding reps through input, enrichment, and output",
      "Server-side streaming responses to keep the UI responsive",
      "Reusable prompt templates that encode MEDDIC-style discovery criteria",
      "Download-ready summaries built for executive readouts",
    ],
    image: "/placeholder.jpg",
    livePath: "/apps/sales-toolkit/brief",
  },
  {
    id: 3,
    title: "ICP Scoring Studio",
    category: "Revenue Intelligence",
    description:
      "Interactive scoring engine that visualizes how closely a target account maps to the ideal customer profile.",
    longDescription:
      "ICP Scoring Studio showcases my approach to translating messy customer data into actionable segmentation. Inside the Sales Toolkit, the experience allows visitors to upload sample account CSVs, trigger heuristic scoring, and review AI-generated positioning guidance. It ties together sales strategy and technical execution for data-driven prospecting.",
    technologies: ["TypeScript", "Next.js", "CSV Parsing", "Embedding Models"],
    features: [
      "Weighted scoring framework with configurable heuristics",
      "Embeddings-backed similarity checks for qualitative signals",
      "Downloadable output that mirrors what I build for GTM leadership",
      "Clear guardrails around data privacy and API usage",
    ],
    image: "/placeholder.jpg",
    livePath: "/apps/sales-toolkit/icp",
  },
  {
    id: 4,
    title: "Objection Handling Coach",
    category: "Conversation Intelligence",
    description:
      "Coaching console that turns recorded objections into dynamic responses rooted in real customer wins.",
    longDescription:
      "The Objection Handling Coach is my take on bringing conversation intelligence into the flow of work. Visitors can explore curated objection libraries, trigger AI-generated rebuttals, and capture follow-up actions. It demonstrates how I think about reinforcement learning loops for GTM teams and the operational rigor needed to keep messaging on-brand.",
    technologies: ["Next.js", "OpenAI", "Sales Playbooks", "Tailwind CSS"],
    features: [
      "Predictive objection surfacing based on persona and stage",
      "Guided responses that mix AI creativity with curated proof points",
      "Copy-to-clipboard UX for rapid enablement",
      "Extensible data model for future voice-of-customer ingestion",
    ],
    image: "/placeholder.jpg",
    livePath: "/apps/sales-toolkit/objections",
  },
];

export const getProjectById = (id: number) => projectsData.find((p) => p.id === id);
export const getProjectCategories = () => Array.from(new Set(projectsData.map((p) => p.category)));
