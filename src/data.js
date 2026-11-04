export const links = {
  github: "https://github.com/brohum10",
  linkedin: "https://www.linkedin.com/in/sohamj2025",
  email: "mailto:soham.jindal16@gmail.com",
  resume: `${import.meta.env.BASE_URL}resume.pdf`,
};

export const experience = [
  {
    company: "ADT",
    role: "AI & Automation Software Engineer",
    date: "August 2026 — Present",
    location: "Boca Raton, FL / Remote",
    summary:
      "Building AI workflow validation and automation. Previously Software Engineering Intern — AI & CX Systems, May–August 2026.",
    bullets: [
      "Built Python/pandas pipelines to classify AI-assisted support interactions, standardize use-case labels, and prioritize data-quality and product defects.",
      "Built pytest regression tests for conversational AI and retrieval, checking routing, escalation, and agent handoffs.",
      "Contributed to LLM workflow development and model training; automated validation across alarm, billing, and account data and partnered with engineers to verify fixes.",
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

export const featuredLenses = [
  {
    id: "systems",
    label: "Systems",
    shortLabel: "Systems",
    projectTitle: "Chronicle LSM Store",
    number: "01",
    thesis: "Make durability visible.",
    description:
      "Follow one write from an atomic journal batch into the in-memory index, then out to searchable, compacted files.",
    stages: ["Write batch", "WAL + recovery", "Memtable", "SSTable + read"],
    proof: "11 sanitizer-tested cases",
    detail: "C++20 · storage engine · crash recovery",
    accent: "amber",
  },
  {
    id: "ai",
    label: "Applied AI",
    shortLabel: "AI",
    projectTitle: "QueuePilot",
    number: "02",
    thesis: "Give automation a limit.",
    description:
      "Compare support-routing models, spend a finite review budget, and keep a human decision trace.",
    stages: ["Request", "Suggest route", "Review budget", "Audit decision"],
    proof: "3,072 held-out requests · release blocked",
    detail: "Python · ML evaluation · SQLite",
    accent: "green",
  },
  {
    id: "product",
    label: "Full stack",
    shortLabel: "Product",
    projectTitle: "ScopeLedger",
    number: "03",
    thesis: "Turn ambiguity into a decision.",
    description:
      "Compare a request with its agreement, verify source quotes, and keep the final estimate in human hands.",
    stages: ["Documents", "AI review", "Verify evidence", "Approve + export"],
    proof: "45 automated tests",
    detail: "React · TypeScript · Cloudflare D1",
    accent: "violet",
  },
  {
    id: "frontend",
    label: "Frontend",
    shortLabel: "Frontend",
    projectTitle: "HarFlow Studio",
    number: "04",
    thesis: "Make performance tangible.",
    description:
      "Explore a network capture locally, compare two runs, and see where the browser spent its time—without an upload.",
    stages: ["Import HAR", "Sanitize", "Compare", "Investigate"],
    proof: "15 tests · browser-only",
    detail: "JavaScript · interaction · privacy",
    accent: "cyan",
  },
];

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
      "Offline challenge reports retrieval misses and out-of-scope false positives; live-model quality remains unmeasured",
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
      "Cranfield's 225 human-judged queries: title + abstract nDCG@10 0.5107 versus a 0.3879 title-only baseline",
    ],
    tags: ["Java", "Spring Boot", "PostgreSQL", "Concurrency", "BM25", "Prometheus"],
    source: "https://github.com/brohum10/concurrent-web-crawler",
    accent: "blue",
  },
  {
    number: "03",
    title: "Chronicle LSM Store",
    category: "Systems",
    type: "Storage engine",
    year: "2026",
    description:
      "A dependency-free C++20 LSM engine that makes atomicity, durability, recovery, indexing, range reads, and compaction trade-offs explicit.",
    highlights: [
      "CRC-protected atomic write batches, SSTable installation, torn-tail recovery, and corruption rejection",
      "Skip lists, Bloom filters, positional I/O, tombstones, k-way range scans, and full compaction",
      "Eleven tests plus ASan/UBSan cover recovery and corruption; local throughput measurements are documented separately",
    ],
    tags: ["C++20", "LSM tree", "Storage", "Concurrency", "Persistence", "CMake"],
    source: "https://github.com/brohum10/chronicle-lsm-store",
    accent: "amber",
  },
  {
    number: "04",
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
    number: "05",
    title: "QueuePilot",
    category: "Applied AI",
    type: "Human-in-the-loop ML",
    year: "2026",
    description:
      "A local support-routing workbench that compares trained text models while limiting how much work can enter a human review queue.",
    highlights: [
      "Replays BANKING77 support questions and keeps model suggestions separate from saved human corrections",
      "Capacity-aware review prioritizes sensitive and uncertain requests without forcing overflow into automation",
      "Official held-out test has 3,072 requests; the candidate release remains blocked after slice checks",
    ],
    tags: ["Python", "scikit-learn", "SQLite", "ML evaluation", "Human review"],
    source: "https://github.com/brohum10/queuepilot",
    accent: "violet",
  },
  {
    number: "06",
    title: "Causal Trace Analyzer",
    category: "Systems",
    type: "Developer tooling",
    year: "2026",
    description:
      "A distributed-systems debugging tool that reconstructs causality from vector-clock traces without trusting wall-clock time.",
    highlights: [
      "Builds a minimal causal DAG through happened-before analysis and transitive reduction",
      "Finds concurrent shared-resource race suspects and the latency-critical causal path",
      "Bitset reduction is checked against the simpler causal graph implementation and benchmarked separately",
    ],
    tags: ["Python", "Vector clocks", "Graphs", "Dynamic programming", "CLI"],
    source: "https://github.com/brohum10/causal-trace-analyzer",
    accent: "amber",
  },
  {
    number: "07",
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
    number: "08",
    title: "Converge Local-First Board",
    category: "Product",
    type: "Real-time collaboration",
    year: "2026",
    description:
      "An offline-capable collaborative board whose TypeScript replicas deterministically merge concurrent edits over a production-shaped sync service.",
    highlights: [
      "Field-level CRDT registers use hybrid logical clocks and operation-ID tie-breaking to converge in any delivery order",
      "PostgreSQL journal, WebSocket rate limits, Prometheus metrics, and Docker Compose create a reproducible service stack",
      "35 tests include a forced reconnect race and generated convergence histories; architecture notes explain remaining limits",
    ],
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "WebSockets", "CRDT"],
    source: "https://github.com/brohum10/converge-crdt-board",
    accent: "green",
  },
  {
    number: "09",
    title: "ScopeLedger",
    category: "Product",
    type: "Full-stack AI workflow",
    year: "2026",
    description:
      "A hosted workspace that compares client requests to an agreement, verifies exact source evidence, and lets a human decide which changes belong in a proposal.",
    highlights: [
      "Two-pass AI review with quote provenance, skeptical verification, and human-controlled estimates",
      "Owner-scoped Cloudflare D1 persistence, revision-safe writes, hash-linked audit events, and exports",
      "45 deterministic tests plus a documented live-provider smoke test; no model-accuracy claim",
    ],
    tags: ["TypeScript", "React", "Cloudflare Workers", "D1", "LLM", "Full-stack"],
    source: "https://github.com/brohum10/scopeledger",
    accent: "violet",
  },
  {
    number: "10",
    title: "HarFlow Studio",
    category: "Product",
    type: "Privacy-first frontend",
    year: "2026",
    description:
      "A browser-only network-capture analyzer with request waterfalls, budgets, and cautious before/after comparisons that never upload a HAR file.",
    highlights: [
      "Sanitized URL and metric normalization, unknown-transfer handling, and accessible local comparison UI",
      "Synthetic HAR benchmark and its measured scope are documented separately from page-speed claims",
      "15 automated edge-case tests and a dependency-free GitHub Pages deployment",
    ],
    tags: ["JavaScript", "Frontend", "Performance", "Accessibility", "Privacy", "GitHub Pages"],
    source: "https://github.com/brohum10/harflow-studio",
    accent: "cyan",
  },
  {
    number: "11",
    title: "RelayForge",
    category: "Systems",
    type: "Backend automation",
    year: "2026",
    description:
      "A durable webhook outbox with signed delivery, idempotent publishing, leased workers, retries, dead-letter recovery, and an authenticated API.",
    highlights: [
      "SQLite WAL and lease tokens handle concurrent claims and crash recovery",
      "11 tests cover signed payloads, retries, idempotency, API authentication, and stale leases",
      "Local storage-path throughput is measured separately from receiver and network time",
    ],
    tags: ["Python", "SQLite", "Webhooks", "Concurrency", "HMAC", "Automation"],
    source: "https://github.com/brohum10/relayforge-webhooks",
    accent: "amber",
  },
  {
    number: "12",
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
