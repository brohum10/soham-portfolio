import { useState } from "react";
import headshot from "./assets/headshot-web.jpg";

const links = {
  github: "https://github.com/brohum10",
  linkedin: "https://www.linkedin.com/in/sohamj2025",
  email: "mailto:soham.jindal16@gmail.com",
  resume: `${import.meta.env.BASE_URL}resume.pdf`,
};

const experience = [
  {
    company: "ADT",
    role: "Software Engineering Intern — AI & CX Systems",
    date: "May 2026 — July 2026",
    location: "Boca Raton, FL",
    summary: "Built evaluation and automation systems that made conversational-AI defects easier to find, prioritize, and verify.",
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
    summary: "Turned large telemetry datasets and repeatable Linux experiments into dependable ML evaluation workflows.",
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
    summary: "Shipped customer-facing web and mobile features backed by cloud workflows and production APIs.",
    bullets: [
      "Shipped JavaScript web features and AWS Lambda-backed workflows supporting 50,000+ monthly user sessions.",
      "Built native Swift and Kotlin features with REST integrations, cutting user-data response time by 20%.",
      "Automated AWS Lambda and Amplify deployments, reducing release turnaround time by 30%.",
    ],
    tags: ["JavaScript", "Swift", "Kotlin", "AWS", "REST APIs"],
  },
];

const projects = [
  {
    number: "01",
    title: "Concurrent Web Crawler & Search Engine",
    type: "Backend systems",
    year: "2025",
    description: "A multithreaded Java crawler and full-text search service built around a thread-safe BFS frontier, responsible crawling, and BM25 ranking.",
    results: [
      "Indexed 25,000+ pages across 16 concurrent workers",
      "Reached 75 ms p95 latency over 1,000 benchmark queries",
      "Added REST APIs, load tests, Docker, CI, and 85% statement coverage",
    ],
    tags: ["Java", "Spring Boot", "PostgreSQL", "Concurrency", "BM25", "Docker"],
    accent: "blue",
  },
  {
    number: "02",
    title: "Semantic Search & Response Platform",
    type: "Applied AI / retrieval",
    year: "2026",
    description: "A retrieval service that indexes message history, ranks context with FAISS, and validates generated responses through a repeatable benchmark.",
    results: [
      "Indexed 100,000+ messages with under 250 ms retrieval latency",
      "Improved Recall@10 from 0.78 to 0.87",
      "Improved MRR from 0.69 to 0.79 across a 500-query benchmark",
    ],
    tags: ["Python", "Flask", "FAISS", "SQLite", "Information retrieval", "Docker"],
    accent: "violet",
  },
];

const skillGroups = [
  { label: "Languages", items: ["Python", "Java", "C++", "C", "JavaScript / TypeScript", "SQL", "Kotlin", "Swift"] },
  { label: "Frameworks & data", items: ["Spring Boot", "FastAPI", "Flask", "Node.js", "React", "PostgreSQL", "SQLite", "FAISS"] },
  { label: "Systems & tooling", items: ["Linux / Unix", "Git", "Docker", "AWS", "Google Cloud", "pytest", "JUnit", "GitHub Actions"] },
];

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

function SectionHeading({ eyebrow, title, intro }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <div className="section-heading__row">
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <nav className="nav container" aria-label="Primary navigation">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Soham Jindal, home">
            <span className="brand__mark">SJ</span>
            <span className="brand__name">Soham Jindal</span>
          </a>
          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((current) => !current)}>
            <span /><span /><span /><span className="sr-only">Toggle navigation</span>
          </button>
          <div id="site-navigation" className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
            <a href="#experience" onClick={closeMenu}>Experience</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href={links.github} target="_blank" rel="noreferrer">GitHub <ExternalArrow /></a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a className="nav__resume" href={links.resume} target="_blank" rel="noreferrer">Résumé <ExternalArrow /></a>
          </div>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero__glow hero__glow--one" aria-hidden="true" />
          <div className="hero__glow hero__glow--two" aria-hidden="true" />
          <div className="container hero__grid">
            <div className="hero__copy">
              <div className="availability"><span className="availability__dot" aria-hidden="true" />Seeking Summer 2027 SWE internships</div>
              <p className="hero__kicker">Computer Engineering · Purdue University</p>
              <h1>Building dependable software for <span>real-world systems.</span></h1>
              <p className="hero__lede">I’m Soham, a software engineer focused on backend systems, data pipelines, and applied ML. I turn complex technical problems into tested, measurable products.</p>
              <div className="hero__actions">
                <a className="button button--primary" href="#projects">Explore my work <span aria-hidden="true">↓</span></a>
                <a className="button button--secondary" href={links.resume} target="_blank" rel="noreferrer">View résumé <ExternalArrow /></a>
              </div>
              <div className="hero__socials" aria-label="Professional links">
                <a href={links.github} target="_blank" rel="noreferrer">GitHub <ExternalArrow /></a>
                <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalArrow /></a>
                <a href={links.email}>Email <ExternalArrow /></a>
              </div>
            </div>
            <aside className="hero-card" aria-label="Soham at a glance">
              <div className="hero-card__top"><p>At a glance</p><span>Sunnyvale, CA</span></div>
              <div className="hero-card__metric hero-card__metric--featured"><strong>3</strong><span>software engineering internships</span></div>
              <div className="hero-card__metrics">
                <div className="hero-card__metric"><strong>200K+</strong><span>telemetry records processed</span></div>
                <div className="hero-card__metric"><strong>25K+</strong><span>pages indexed</span></div>
                <div className="hero-card__metric"><strong>100K+</strong><span>messages indexed</span></div>
                <div className="hero-card__metric"><strong>3.7</strong><span>Purdue GPA</span></div>
              </div>
              <div className="hero-card__footer"><span>B.S. Computer Engineering</span><span>May 2028</span></div>
            </aside>
          </div>
        </section>

        <section className="section section--bordered" id="experience">
          <div className="container">
            <SectionHeading eyebrow="Experience" title="Engineering across AI, data, cloud, and product." intro="Three internships, each centered on shipping useful systems and measuring the result." />
            <div className="timeline">
              {experience.map((job, index) => (
                <article className="experience-card" key={job.company}>
                  <div className="experience-card__index" aria-hidden="true">0{index + 1}</div>
                  <div className="experience-card__heading">
                    <div><h3>{job.company}</h3><p>{job.role}</p></div>
                    <div className="experience-card__meta"><span>{job.date}</span><span>{job.location}</span></div>
                  </div>
                  <p className="experience-card__summary">{job.summary}</p>
                  <ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  <div className="tag-list" aria-label={`${job.company} technologies`}>{job.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <SectionHeading eyebrow="Selected projects" title="Systems designed, benchmarked, and tested." intro="Project work that goes beyond the happy path: concurrency, ranking, reliability, evaluation, and deployment." />
            <div className="projects-grid">
              {projects.map((project) => (
                <article className={`project-card project-card--${project.accent}`} key={project.number}>
                  <div className="project-card__header"><span>{project.number}</span><div><span>{project.type}</span><span>{project.year}</span></div></div>
                  <h3>{project.title}</h3>
                  <p className="project-card__description">{project.description}</p>
                  <ul>{project.results.map((result) => <li key={result}>{result}</li>)}</ul>
                  <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
            <div className="projects-note"><p>Want to see how I think through implementation details?</p><a href={links.github} target="_blank" rel="noreferrer">Browse my GitHub profile <ExternalArrow /></a></div>
          </div>
        </section>

        <section className="section section--tinted" id="skills">
          <div className="container">
            <SectionHeading eyebrow="Technical toolkit" title="A practical stack for end-to-end engineering." />
            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <article className="skill-card" key={group.label}>
                  <span className="skill-card__number">0{index + 1}</span><h3>{group.label}</h3>
                  <div className="skill-card__items">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container about-grid">
            <div className="about-photo"><div className="about-photo__frame"><img src={headshot} alt="Soham Jindal" /></div><span className="about-photo__label">Sunnyvale ↔ Purdue</span></div>
            <div className="about-copy">
              <p className="eyebrow">About me</p><h2>Curious about the system underneath the feature.</h2>
              <p>I’m studying Computer Engineering at Purdue with a minor in Artificial Intelligence and Machine Learning. My favorite work sits where software fundamentals meet messy, real data: designing the pipeline, handling edge cases, testing the behavior, and measuring whether the result actually improved.</p>
              <p>Across ADT, L3Harris, and Alpha Net, I’ve worked on conversational-AI validation, telemetry pipelines, anomaly detection, cloud workflows, and mobile product features. I’m now looking for a Summer 2027 software engineering internship where I can keep building reliable systems with a strong team.</p>
              <div className="education-card">
                <div><span>Education</span><strong>Purdue University</strong><p>B.S. Computer Engineering · AI/ML minor</p></div>
                <div><span>Expected</span><strong>May 2028</strong><p>GPA: 3.7 · U.S. Citizen</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container contact__inner">
            <div><p className="eyebrow">Let’s connect</p><h2>Have an engineering problem worth solving?</h2><p>I’m always open to thoughtful conversations about internships, software systems, and applied ML.</p></div>
            <div className="contact__actions"><a className="button button--primary" href={links.email}>Send me an email <ExternalArrow /></a><a className="text-link" href={links.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <ExternalArrow /></a></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <div><span className="brand__mark">SJ</span><p>Designed and built by Soham Jindal.</p></div>
          <div className="footer__links"><a href={links.github} target="_blank" rel="noreferrer">GitHub</a><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={links.resume} target="_blank" rel="noreferrer">Résumé</a></div>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
