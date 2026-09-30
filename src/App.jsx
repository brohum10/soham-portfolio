import { useEffect, useMemo, useState } from "react";
import headshot from "./assets/headshot-web.jpg";
import { experience, featuredLenses, links, projectFilters, projects, skillGroups } from "./data";

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

function SectionHeading({ eyebrow, title, intro, id }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <div className="section-heading__row">
        <h2 id={id}>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={`project-card project-card--${project.accent}`}>
      <div className="project-card__header">
        <span aria-hidden="true">{project.number}</span>
        <div>
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>
      </div>
      <h3>{project.title}</h3>
      <p className="project-card__description">{project.description}</p>
      <ul>
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className="project-card__footer">
        <div className="tag-list" aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a
          className="project-card__link"
          href={project.source}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.title} source code on GitHub`}
        >
          View source <ExternalArrow />
        </a>
      </div>
    </article>
  );
}

function ProjectMap({ activeLens, onSelect }) {
  return (
    <div className={`project-map project-map--${activeLens.accent}`} role="group" aria-label="Interactive project map">
      <div className="project-map__header">
        <span>Explore the work</span>
        <span>{activeLens.number} / {String(featuredLenses.length).padStart(2, "0")}</span>
      </div>
      <div className="project-map__canvas">
        <svg className="project-map__connections" viewBox="0 0 440 360" preserveAspectRatio="none" aria-hidden="true">
          <path d="M220 178 L84 65 M220 178 L356 65 M220 178 L84 287 M220 178 L356 287" />
          <circle cx="220" cy="178" r="94" />
          <circle cx="220" cy="178" r="138" />
        </svg>
        <div className="project-map__center" aria-hidden="true">
          <span>BUILD</span>
          <strong>↗</strong>
          <span>PROVE</span>
        </div>
        {featuredLenses.map((lens) => (
          <button
            className={`project-map__node project-map__node--${lens.id}`}
            type="button"
            key={lens.id}
            aria-pressed={activeLens.id === lens.id}
            aria-label={`Explore ${lens.label} projects`}
            onClick={() => onSelect(lens.id)}
          >
            <span>{lens.number}</span>
            <strong>{lens.shortLabel}</strong>
          </button>
        ))}
      </div>
      <div className="project-map__readout" aria-live="polite">
        <span>Selected / {activeLens.label}</span>
        <strong>{activeLens.projectTitle}</strong>
        <a href="#featured-work">See how it works <span aria-hidden="true">↘</span></a>
      </div>
    </div>
  );
}

function FeaturedWork({ activeLens, onSelect }) {
  const project = projects.find((item) => item.title === activeLens.projectTitle);

  return (
    <section className="featured-work" id="featured-work" aria-labelledby="featured-work-title">
      <div className="container">
        <div className="featured-work__intro">
          <div>
            <p className="eyebrow">A closer look</p>
            <h2 id="featured-work-title">Pick a lens. Follow the thinking.</h2>
          </div>
          <p>Four kinds of problems, one approach: understand the edge cases, build the path, and show the evidence.</p>
        </div>
        <div className="featured-work__choices" role="group" aria-label="Featured project category">
          {featuredLenses.map((lens) => (
            <button
              type="button"
              key={lens.id}
              aria-pressed={activeLens.id === lens.id}
              onClick={() => onSelect(lens.id)}
            >
              <span>{lens.number}</span>{lens.label}<span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div className={`featured-work__panel featured-work__panel--${activeLens.accent}`} key={activeLens.id} aria-live="polite">
          <div className="featured-work__story">
            <p className="featured-work__overline">Selected system / {activeLens.detail}</p>
            <h3>{activeLens.thesis}</h3>
            <p>{activeLens.description}</p>
            <div className="featured-work__story-bottom">
              <div><span>Evidence</span><strong>{activeLens.proof}</strong></div>
              <a href={project.source} target="_blank" rel="noreferrer">
                Explore {activeLens.projectTitle} <ExternalArrow />
              </a>
            </div>
          </div>
          <div className="featured-work__diagram" aria-label={`${activeLens.projectTitle} process`}>
            <div className="featured-work__diagram-head">
              <span>Inside the build</span>
              <span>0{activeLens.stages.length} steps</span>
            </div>
            <ol>
              {activeLens.stages.map((stage, index) => (
                <li key={stage}>
                  <span>0{index + 1}</span>
                  <strong>{stage}</strong>
                  {index < activeLens.stages.length - 1 && <span aria-hidden="true">↘</span>}
                </li>
              ))}
            </ol>
            <p>Explore the repository for the full architecture, tests, and limits.</p>
          </div>
        </div>
        <a className="featured-work__all" href="#projects">Browse all {projects.length} projects <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeLensId, setActiveLensId] = useState(featuredLenses[0].id);
  const activeLens = featuredLenses.find((lens) => lens.id === activeLensId);

  const visibleProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <nav className="nav container" aria-label="Primary navigation">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Soham Jindal, home">
            <span className="brand__mark">SJ</span>
            <span className="brand__name">Soham Jindal</span>
          </a>

          <button
            className={`menu-button ${menuOpen ? "menu-button--open" : ""}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <div id="site-navigation" className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
            <a href="#experience" onClick={closeMenu}>Experience</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href={links.github} target="_blank" rel="noreferrer">GitHub <ExternalArrow /></a>
            <a className="nav__resume" href={links.resume} target="_blank" rel="noreferrer">
              Résumé <ExternalArrow />
            </a>
          </div>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__glow hero__glow--one" aria-hidden="true" />
          <div className="hero__glow hero__glow--two" aria-hidden="true" />
          <div className="container hero__grid">
            <div className="hero__copy">
              <div className="availability">
                <span className="availability__dot" aria-hidden="true" />
                Seeking Summer 2027 SWE internships
              </div>
              <p className="hero__kicker">Systems · Applied AI · Product engineering</p>
              <h1 id="hero-title">
                I build software that holds up <span>under scrutiny.</span>
              </h1>
              <p className="hero__lede">
                I’m Soham, a Purdue Computer Engineering student building everything from durable
                storage engines and evidence-backed AI to interfaces that make complex data useful.
                I care about failure modes, measurable results, and code another engineer can extend.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#featured-work">
                  Explore the work <span aria-hidden="true">↓</span>
                </a>
                <a className="button button--secondary" href={links.resume} target="_blank" rel="noreferrer">
                  View résumé <ExternalArrow />
                </a>
              </div>
              <div className="hero__socials" aria-label="Professional links">
                <a href={links.github} target="_blank" rel="noreferrer">GitHub <ExternalArrow /></a>
                <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalArrow /></a>
                <a href={links.email}>Email <ExternalArrow /></a>
              </div>
            </div>

            <ProjectMap activeLens={activeLens} onSelect={setActiveLensId} />
          </div>
          <div className="container hero__evidence" aria-label="Engineering snapshot">
            <p><strong>{String(experience.length).padStart(2, "0")}</strong><span>engineering internships</span></p>
            <p><strong>{String(projects.length).padStart(2, "0")}</strong><span>selected builds</span></p>
            <p><strong>200K+</strong><span>telemetry records processed</span></p>
            <p><strong>May ’28</strong><span>Purdue Computer Engineering</span></p>
          </div>
        </section>

        <FeaturedWork activeLens={activeLens} onSelect={setActiveLensId} />

        <section className="section section--bordered" id="experience" aria-labelledby="experience-title">
          <div className="container">
            <SectionHeading
              id="experience-title"
              eyebrow="Experience"
              title="Engineering across AI, data, cloud, and product."
              intro="Three internships centered on shipping useful systems, making behavior testable, and measuring the result."
            />
            <div className="timeline">
              {experience.map((job, index) => (
                <article className="experience-card" key={job.company}>
                  <div className="experience-card__index" aria-hidden="true">0{index + 1}</div>
                  <div className="experience-card__heading">
                    <div>
                      <h3>{job.company}</h3>
                      <p>{job.role}</p>
                    </div>
                    <div className="experience-card__meta">
                      <span>{job.date}</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <p className="experience-card__summary">{job.summary}</p>
                  <ul>
                    {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                  <div className="tag-list" aria-label={`${job.company} technologies`}>
                    {job.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projects" aria-labelledby="projects-title">
          <div className="container">
            <SectionHeading
              id="projects-title"
              eyebrow="Selected projects"
              title="Systems with visible engineering depth."
              intro="Each project has a runnable path, deliberate constraints, automated checks, and an honest explanation of what is—and is not—measured."
            />

            <div className="project-filters" aria-label="Filter projects">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
              <p aria-live="polite">
                Showing {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}
              </p>
            </div>

            <div className="projects-grid">
              {visibleProjects.map((project) => <ProjectCard project={project} key={project.number} />)}
            </div>
          </div>
        </section>

        <section className="principles" aria-labelledby="principles-title">
          <div className="container principles__grid">
            <div>
              <p className="eyebrow">Engineering approach</p>
              <h2 id="principles-title">Built for the second question.</h2>
            </div>
            <ol className="principles__list">
              <li><span>01</span><div><strong>What breaks?</strong><p>Start with invariants, boundaries, cancellation, retries, and recovery—not only the happy path.</p></div></li>
              <li><span>02</span><div><strong>How do we know?</strong><p>Use deterministic tests and benchmarks, then state exactly what the evidence supports.</p></div></li>
              <li><span>03</span><div><strong>Can someone extend it?</strong><p>Keep interfaces small, architecture explicit, and setup close to one command.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="section section--tinted" id="skills" aria-labelledby="skills-title">
          <div className="container">
            <SectionHeading
              id="skills-title"
              eyebrow="Technical toolkit"
              title="A practical stack for end-to-end engineering."
              intro="Tools chosen to fit the system: from protocol and data-pipeline code to APIs, persistence, tests, and delivery."
            />
            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <article className="skill-card" key={group.label}>
                  <span className="skill-card__number" aria-hidden="true">0{index + 1}</span>
                  <h3>{group.label}</h3>
                  <div className="skill-card__items">
                    {group.items.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="about-photo">
              <div className="about-photo__frame">
                <img
                  src={headshot}
                  alt="Soham Jindal"
                  width="933"
                  height="1400"
                  loading="lazy"
                />
              </div>
              <span className="about-photo__label">Sunnyvale ↔ Purdue</span>
            </div>
            <div className="about-copy">
              <p className="eyebrow">About me</p>
              <h2 id="about-title">Curious about the system underneath the feature.</h2>
              <p>
                I’m studying Computer Engineering at Purdue with a minor in Artificial Intelligence and
                Machine Learning. My favorite work sits where software fundamentals meet messy, real data:
                designing the pipeline, handling edge cases, testing behavior, and measuring whether the
                result actually improved.
              </p>
              <p>
                Across ADT, L3Harris, and Alpha Net, I’ve worked on conversational-AI validation, telemetry
                pipelines, anomaly detection, cloud workflows, and mobile product features. I’m looking for
                a Summer 2027 software engineering internship where I can keep building reliable systems with
                a strong team.
              </p>
              <div className="education-card">
                <div><span>Education</span><strong>Purdue University</strong><p>B.S. Computer Engineering · AI/ML minor</p></div>
                <div><span>Expected</span><strong>May 2028</strong><p>GPA: 3.7 · U.S. Citizen</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="container contact__inner">
            <div>
              <p className="eyebrow">Let’s connect</p>
              <h2 id="contact-title">Have an engineering problem worth solving?</h2>
              <p>I’m open to thoughtful conversations about internships, software systems, data infrastructure, and applied ML.</p>
            </div>
            <div className="contact__actions">
              <a className="button button--primary" href={links.email}>Send me an email <ExternalArrow /></a>
              <a className="text-link" href={links.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <ExternalArrow /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <div><span className="brand__mark">SJ</span><p>Designed and built by Soham Jindal.</p></div>
          <div className="footer__links">
            <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={links.resume} target="_blank" rel="noreferrer">Résumé</a>
          </div>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
