export const links = {
  github: "https://github.com/brohum10",
  linkedin: "https://www.linkedin.com/in/sohamj2025",
  email: "mailto:soham.jindal16@gmail.com",
  resume: `${import.meta.env.BASE_URL}resume.pdf`,
};

export const experience = [
  {
    company: "ADT",
    role: "Software Engineering Intern — AI & CX Systems",
    date: "May 2026 — July 2026",
    location: "Boca Raton, FL",
    summary:
      "Built evaluation and automation systems that made conversational-AI defects easier to find, prioritize, and verify.",
    bullets: [
      "Built a Python/pandas ETL and classification pipeline for 600+ AI-assisted support interactions.",
      "Created a Python/pytest regression suite covering 40+ conversational AI and knowledge-retrieval flows, surfacing 25+ defects.",
      "Automated validation and reporting across alarm, billing, and account datasets, reducing weekly defect-triage time from 5 hours to 90 minutes.",
    ],
    tags: ["Python", "pandas", "pytest", "ETL", "AI evaluation"],
  },
  {
    company: "L3Harris",
    role: "Software Engineering Intern — ML Systems",
    date: "August 2025 — December 2025",
    location: "West Lafayette, IN / Remote",
    summary:
      "Turned large telemetry datasets and repeatable Linux experiments into dependable ML evaluation workflows.",
    bullets: [
      "Developed ETL and validation pipelines for 200,000+ NASA NOS3 telemetry records with automated data-quality checks.",
      "Improved labeled attack recall from 68% to 83% through feature engineering and anomaly-model error analysis.",
      "Automated VirtualBox/Linux packet-capture and injection experiments, generating 10,000+ labeled traces and reducing setup time by 40%.",
    ],
    tags: ["Python", "scikit-learn", "Linux", "Telemetry", "ML evaluation"],
  },
  {
    company: "Alpha Net",
    role: "Software Engineer Intern",
    date: "May 2025 — August 2025",
    location: "Santa Clara, CA",
    summary:
      "Shipped customer-facing web and mobile features backed by cloud workflows and production APIs.",
    bullets: [
      "Shipped JavaScript web features and AWS Lambda-backed workflows supporting 50,000+ monthly user sessions.",
      "Built native Swift and Kotlin features with REST integrations, cutting user-data response time by 20%.",
      "Automated AWS Lambda and Amplify deployments, reducing release turnaround time by 30%.",
    ],
    tags: ["JavaScript", "Swift", "Kotlin", "AWS", "REST APIs"],
  },
];

export const projectFilters = ["All", "Systems", "Applied AI", "Product"];

export const projects = [
  {
    number: "01",
    title: "LLM Incident Response Copilot",
    category: "Applied AI",
    type: "Guardrailed AI systems",
    year: "2026",
    description:
      "A retrieval-augmented service that turns noisy production incidents into cited, auditable response plans without automating operational changes.",
    highlights: [
      "Hybrid runbook retrieval, structured plan validation, and verified evidence citations",
      "Allowlisted read-only diagnostics, prompt-injection defenses, approval gates, and SQLite audit trails",
      "Deterministic evaluation: 1.00 Recall@4, citation coverage, and unsafe-request block rate",
    ],
    tags: ["Python", "RAG", "LLM safety", "BM25", "SQLite", "Flask"],
    source: "https://github.com/brohum10/llm-incident-response-copilot",
    accent: "green",
  },
  {
    number: "02",
    title: "Concurrent Web Crawler & Search Engine",
    category: "Systems",
    type: "Backend systems",
    year: "2026",
    description:
      "A production-minded Java service that runs bounded crawl jobs, safely traverses the web with concurrent BFS, and serves BM25-ranked results.",
    highlights: [
      "Asynchronous job lifecycle with progress, cancellation, scope controls, and a bounded executor",
      "Redirect-safe streaming, robots rules, per-host pacing, and private-network protection",
      "25,000-document benchmark: 20.503 ms p95 and 1.000 Recall@10",
    ],
    tags: ["Java", "Spring Boot", "PostgreSQL", "Concurrency", "BM25", "Prometheus"],
    source: "https://github.com/brohum10/concurrent-web-crawler",
    accent: "blue",
  },
  {
    number: "03",
    title: "Mini Raft Store",
    category: "Systems",
    type: "Distributed systems",
    year: "2026",
    description:
      "A dependency-free distributed key-value store implementing the essential Raft protocol across a three-node cluster.",
    highlights: [
      "Randomized elections, heartbeats, majority commits, and log-conflict repair",
      "Durable term, vote, log, and commit state using fsync and atomic rename",
      "Multi-process tests kill and restart leaders and followers while the cluster is active",
    ],
    tags: ["Python", "Raft", "Consensus", "HTTP", "Persistence", "Docker"],
    source: "https://github.com/brohum10/mini-raft-store",
    accent: "cyan",
  },
  {
    number: "04",
    title: "Semantic Search & Response Platform",
    category: "Applied AI",
    type: "Retrieval infrastructure",
    year: "2026",
    description:
      "A local-first retrieval service that persists messages, searches normalized vectors, reranks candidates, and returns source-backed responses.",
    highlights: [
      "FAISS inner-product search with a NumPy fallback and SQLite WAL persistence",
      "Hybrid ranking combines semantic similarity, recency, and lexical overlap",
      "100,000-document benchmark: 16.625 ms p95, 1.000 Recall@10, and 1.000 MRR",
    ],
    tags: ["Python", "Flask", "FAISS", "SQLite", "Retrieval", "Docker"],
    source: "https://github.com/brohum10/semantic-search-platform",
    accent: "violet",
  },
  {
    number: "05",
    title: "Causal Trace Analyzer",
    category: "Systems",
    type: "Developer tooling",
    year: "2026",
    description:
      "A distributed-systems debugging tool that reconstructs causality from vector-clock traces without trusting wall-clock time.",
    highlights: [
      "Builds a minimal causal DAG through happened-before analysis and transitive reduction",
      "Finds concurrent shared-resource race suspects and the latency-critical causal path",
      "400-event benchmark: 130.339 ms median after a bitset reduction optimization",
    ],
    tags: ["Python", "Vector clocks", "Graphs", "Dynamic programming", "CLI"],
    source: "https://github.com/brohum10/causal-trace-analyzer",
    accent: "amber",
  },
  {
    number: "06",
    title: "Luma Journal",
    category: "Applied AI",
    type: "On-device AI product",
    year: "2026",
    description:
      "A privacy-first iPhone journal that turns typed or dictated notes into moods, topics, and reviewable next actions on device.",
    highlights: [
      "Structured generation through Apple Foundation Models and @Generable",
      "Local SwiftData persistence and on-device speech recognition with fail-closed behavior",
      "Review-before-writing flow for Reminders and Calendar; no accounts, analytics, or network layer",
    ],
    tags: ["Swift", "SwiftUI", "Foundation Models", "SwiftData", "EventKit"],
    source: "https://github.com/brohum10/LumaJournal",
    accent: "rose",
  },
  {
    number: "07",
    title: "Software Engineering Portfolio",
    category: "Product",
    type: "Web experience",
    year: "2026",
    description:
      "The responsive React site you are viewing, designed to make architecture, trade-offs, and verified outcomes easy to scan.",
    highlights: [
      "Accessible navigation, project filtering, keyboard states, and reduced-motion support",
      "Centralized content model with focused component tests and lint/build checks",
      "Deployed through GitHub Pages with downloadable résumé and direct project links",
    ],
    tags: ["React", "Vite", "CSS", "Accessibility", "Vitest", "GitHub Pages"],
    source: "https://github.com/brohum10/soham-portfolio",
    accent: "slate",
  },
];

export const skillGroups = [
  {
    label: "Languages",
    items: ["Python", "Java", "C++", "C", "JavaScript / TypeScript", "SQL", "Kotlin", "Swift"],
  },
  {
    label: "Backend & data",
    items: ["Spring Boot", "FastAPI", "Flask", "Node.js", "PostgreSQL", "SQLite", "FAISS", "React"],
  },
  {
    label: "Systems & delivery",
    items: ["Linux / Unix", "Git", "Docker", "AWS", "Google Cloud", "pytest", "JUnit", "GitHub Actions"],
  },
];
