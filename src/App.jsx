import { useMemo, useState, useEffect } from "react";
import { Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import headshot from "./assets/headshot.jpg";

/**
 * AI & Digital Experience “week mode”
 * Works with GitHub Pages + Vite base because we use RELATIVE asset paths (no leading /).
 */
const LINKS = {
  github: "https://github.com/brohum10/leetcode/tree/main",
  linkedin: "https://linkedin.com/in/sohamj2025",
  email: "mailto:soham.jindal16@gmail.com",
  resume: "resume.pdf",
  cover: "cover-letter.pdf",
  droneVideo: "https://youtu.be/LozUyizZhEk",
};

// Put your big background image in /public named bg.jpg
const BG_IMAGE = "bg.jpg";

// Small text switches you can edit quickly
const TARGET_ROLE = "AI & Digital Experience Intern";
const TAGLINE =
  "I bridge AI + product UX: evaluate systems, improve user journeys, and ship measurable fixes.";

export default function App() {
  // Enables /#about scrolling even with Router + hash anchors
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/" && hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash, pathname]);

  return (
    <div style={page}>
      <div
        aria-hidden="true"
        style={{
          ...bg,
          backgroundImage: BG_IMAGE
            ? `url(${BG_IMAGE})`
            : "radial-gradient(900px 600px at 20% 20%, rgba(99,102,241,0.28), transparent 60%), radial-gradient(900px 600px at 85% 30%, rgba(34,197,94,0.22), transparent 55%), linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.55))",
        }}
      />
      <div aria-hidden="true" style={bgOverlay} />

      <TopNav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<CaseStudies />} />
        <Route path="/resume" element={<PdfPage title="Resume" pdfUrl={LINKS.resume} />} />
        <Route
          path="/cover-letter"
          element={<PdfPage title="Cover Letter" pdfUrl={LINKS.cover} />}
        />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

function TopNav() {
  return (
    <div style={navWrap}>
      <div style={navInner}>
        <Link to="/" style={brand}>
          SOHAM JINDAL
        </Link>

        <div style={navLinks}>
          {/* HashRouter friendly "About" */}
          <a style={navA} href="#/##about">
            About
          </a>

          <NavItem to="/projects" label="Case Studies" />
          <NavItem to="/hobbies" label="Hobbies" />
          <NavItem to="/contact" label="Contact" />
          <NavItem to="/resume" label="Resume" />
        </div>
      </div>
    </div>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...navA,
        opacity: isActive ? 1 : 0.85,
        textDecoration: "none",
      })}
    >
      {label}
    </NavLink>
  );
}

/* ===========================
   HOME (AI & Digital Experience)
   =========================== */

function Home() {
  const highlightStats = useMemo(
    () => [
      { label: "Strength", value: "AI evaluation + product thinking" },
      { label: "Workflow", value: "Analyze → Diagnose → Improve → Validate" },
      { label: "Tooling", value: "Python, SQL, dashboards, experiments" },
      { label: "Focus", value: "Quality, clarity, self-service UX" },
    ],
    []
  );

  return (
    <>
      <section style={hero}>
        <div style={heroInner}>
          <div style={heroKicker}>TARGETING</div>
          <h1 style={heroTitle}>{TARGET_ROLE}</h1>
          <p style={heroSub}>{TAGLINE}</p>

          <div style={ctaRow}>
            <Link style={btnLightOnDarkPrimary} to="/projects">
              View Case Studies
            </Link>
            <Link style={btnLightOnDark} to="/resume">
              Resume
            </Link>
            <a style={btnLightOnDark} href={LINKS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a style={btnLightOnDark} href={LINKS.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>

          <div style={scrollHint} aria-hidden="true">
            Scroll ⌄
          </div>
        </div>
      </section>

      <main style={content}>
        <section id="about" style={section}>
          <SectionTitle title="About" />

          <div style={twoCol}>
            <div style={glassPanel}>
              <div style={aboutTop}>
                <img src={headshot} alt="Soham Jindal" style={avatar} />
                <div>
                  <div style={meta}>Computer Engineering • Purdue • May 2026</div>
                  <div style={hName}>Soham Jindal</div>
                  <div style={meta2}>Bay Area (SF) / Purdue University</div>
                </div>
              </div>

              <p style={textOnDark}>
                I’m a CompE student at Purdue with an AI/ML concentration. I’m especially interested
                in roles where AI meets user experience: measuring quality, finding failure modes,
                improving content/workflows, and validating impact with metrics.
              </p>

              <p style={textOnDark}>
                I like work that’s practical and measurable: build an evaluation rubric, run error
                analysis, propose fixes, then re-measure so teams can ship with confidence.
              </p>

              <div style={ctaRow}>
                <Link style={btnDark} to="/resume">
                  Resume
                </Link>
                <Link style={btnOutlineOnGlass} to="/cover-letter">
                  Cover Letter
                </Link>
                <a style={btnOutlineOnGlass} href={LINKS.email}>
                  Email
                </a>
              </div>
            </div>

            <div style={glassPanel}>
              <div style={smallHeadOnDark}>What I do</div>

              <div style={whatIDoGrid}>
                <div style={miniCard}>
                  <div style={miniTitle}>1) Analyze</div>
                  <div style={miniText}>
                    Pull logs/feedback, segment issues, identify what users actually struggle with.
                  </div>
                </div>
                <div style={miniCard}>
                  <div style={miniTitle}>2) Diagnose</div>
                  <div style={miniText}>
                    Build a rubric, do error analysis, map root causes (content, retrieval, UX).
                  </div>
                </div>
                <div style={miniCard}>
                  <div style={miniTitle}>3) Improve</div>
                  <div style={miniText}>
                    Write clearer content, adjust prompts, tune retrieval, redesign flow steps.
                  </div>
                </div>
                <div style={miniCard}>
                  <div style={miniTitle}>4) Validate</div>
                  <div style={miniText}>
                    Measure before/after, run A/B tests when possible, ship the win.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={smallHeadOnDark}>Highlights</div>
                <div style={statGrid}>
                  {highlightStats.map((s) => (
                    <div key={s.label} style={statTile}>
                      <div style={statLabel}>{s.label}</div>
                      <div style={statValue}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={section}>
          <SectionTitle title="Quick links" />
          <div style={ctaRow}>
            <Link style={btnOutlineOnGlass} to="/projects">
              Case Studies
            </Link>
            <Link style={btnOutlineOnGlass} to="/resume">
              Resume
            </Link>
            <Link style={btnOutlineOnGlass} to="/cover-letter">
              Cover Letter
            </Link>
            <Link style={btnOutlineOnGlass} to="/hobbies">
              Hobbies
            </Link>
            <Link style={btnOutlineOnGlass} to="/contact">
              Contact
            </Link>
          </div>
        </section>

        <footer style={footerOnDark}>© {new Date().getFullYear()} Soham Jindal</footer>
      </main>
    </>
  );
}

/* ===========================
   CASE STUDIES (AI + Digital UX framing)
   =========================== */

function CaseStudies() {
  const [openId, setOpenId] = useState("ai-quality");

  const studies = useMemo(
    () => [
      {
        id: "ai-quality",
        title: "AI Quality: Retrieval + Style-Consistent Replies",
        oneLiner:
          "Designed a prototype that retrieves relevant context and generates responses aligned to a user’s prior style.",
        outcome:
          "Built a measurable evaluation mindset: quality checks, side-by-side comparisons, and iteration.",
        bullets: [
          "Structured a retrieval + generation flow and tracked quality through repeatable tests",
          "Focused on failure modes: irrelevant retrieval, style drift, and unsafe outputs",
          "Created a lightweight demo interface to compare outputs and iterate quickly",
        ],
        tech: ["Python", "Flask", "FAISS", "SQLite", "Docker"],
        howItMaps: ["AI eval", "rubrics", "error analysis", "UX iteration"],
      },
      {
        id: "telemetry",
        title: "Signal QA: Telemetry Pipelines + Detector Evaluation",
        oneLiner:
          "Built reproducible pipelines for telemetry feature extraction, QA checks, and evaluation metrics.",
        outcome:
          "Learned how to turn messy signals into dependable, measurable workflows.",
        bullets: [
          "Implemented windowed features + QA checks to ensure data reliability",
          "Evaluated approaches with precision/recall and ROC-AUC for a consistent measurement loop",
          "Used Linux/virtual environments to simulate conditions and produce labeled traces",
        ],
        tech: ["Python", "pandas", "scikit-learn", "Linux", "SQL"],
        howItMaps: ["data QA", "metrics", "workflow automation", "reporting"],
      },
      {
        id: "digital-exp",
        title: "Digital Experience: Mobile Product Reliability",
        oneLiner:
          "Shipped mobile features and improved app reliability through systematic testing and refactoring.",
        outcome:
          "Built intuition for user experience: stability and clarity drive adoption and retention.",
        bullets: [
          "Worked on real-user features (payments, notifications, analytics)",
          "Improved stability via testing and refactoring mindset",
          "Collaborated in an Agile team with reviews and iteration cycles",
        ],
        tech: ["Kotlin", "Swift", "CI/CD", "Git"],
        howItMaps: ["customer experience", "quality", "analytics", "iteration"],
      },
      {
        id: "web",
        title: "Web + Cloud: Shipping Improvements",
        oneLiner:
          "Improved a production website and supported workflows with cloud tools and deployment patterns.",
        outcome:
          "Learned how small UX improvements compound, especially in customer-facing flows.",
        bullets: [
          "Improved UX and functionality on a production site",
          "Supported scalable workflows with cloud patterns (AWS/Lambda exposure)",
          "Collaborated with stakeholders to translate needs into shipped work",
        ],
        tech: ["HTML/CSS", "JavaScript", "AWS", "Lambda"],
        howItMaps: ["self-service UX", "stakeholder alignment", "delivery"],
      },
    ],
    []
  );

  return (
    <main style={content}>
      <section style={section}>
        <SectionTitle title="Case Studies" />
        <p style={subtleOnDark}>
          Framed for AI + digital experience work: quality evaluation, user-impact iteration,
          and measurable improvement loops.
        </p>

        <div style={accordion}>
          {studies.map((p) => {
            const isOpen = openId === p.id;
            return (
              <button
                key={p.id}
                style={{ ...accItemGlass, ...(isOpen ? accItemGlassOpen : {}) }}
                onClick={() => setOpenId(isOpen ? "" : p.id)}
              >
                <div style={accTop}>
                  <div>
                    <div style={accTitleOnDark}>{p.title}</div>
                    <div style={accOneOnDark}>{p.oneLiner}</div>
                  </div>
                  <div style={accChevronOnDark}>{isOpen ? "−" : "+"}</div>
                </div>

                {isOpen && (
                  <div style={accBody} onClick={(e) => e.stopPropagation()}>
                    <div style={smallHeadOnDark}>Impact / outcome</div>
                    <div style={impactBox}>{p.outcome}</div>

                    <div style={{ marginTop: 12 }}>
                      <div style={smallHeadOnDark}>What I did</div>
                      <ul style={listOnDark}>
                        {p.bullets.map((d) => (
                          <li key={d} style={{ marginBottom: 6 }}>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={twoMiniCols}>
                      <div>
                        <div style={smallHeadOnDark}>Tech</div>
                        <div style={pillRow}>
                          {p.tech.map((t) => (
                            <span key={t} style={pillOnGlass}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div style={smallHeadOnDark}>How this maps</div>
                        <div style={pillRow}>
                          {p.howItMaps.map((x) => (
                            <span key={x} style={pillOnGlass}>
                              {x}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <Link style={btnDark} to="/resume">
                        View Resume
                      </Link>
                      <a style={btnOutlineOnGlass} href={LINKS.linkedin} target="_blank" rel="noreferrer">
                        LinkedIn
                      </a>
                      <a style={btnOutlineOnGlass} href={LINKS.github} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <footer style={footerOnDark}>© {new Date().getFullYear()} Soham Jindal</footer>
    </main>
  );
}

/* ===========================
   HOBBIES / CONTACT / PDF
   =========================== */

function Hobbies() {
  const hobbies = useMemo(
    () => [
      { title: "Drone flying", desc: "I fly drones and make short edits.", link: LINKS.droneVideo, linkText: "Watch a clip" },
      { title: "Bodybuilding", desc: "Training consistently and tracking progress." },
      { title: "Tennis", desc: "Competitive reset and a good mental break." },
      { title: "Water polo", desc: "Team sport background—high intensity and disciplined." },
      { title: "Traveling", desc: "Exploring new places and trying local food." },
      { title: "Learning new skills", desc: "Always picking up something new outside class." },
    ],
    []
  );

  return (
    <main style={content}>
      <section style={section}>
        <SectionTitle title="Hobbies" />

        <div style={hobbyGrid}>
          {hobbies.map((h) => (
            <div key={h.title} style={glassCard}>
              <div style={hobbyTitleOnDark}>{h.title}</div>
              <div style={hobbyDescOnDark}>{h.desc}</div>
              {h.link && (
                <a
                  style={{ ...btnOutlineOnGlass, marginTop: 12, display: "inline-block" }}
                  href={h.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {h.linkText || "Open link"}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer style={footerOnDark}>© {new Date().getFullYear()} Soham Jindal</footer>
    </main>
  );
}

function Contact() {
  return (
    <main style={content}>
      <section style={section}>
        <SectionTitle title="Contact" />
        <p style={textOnDark}>
          Email is best. I’m happy to chat about AI quality, digital experience, or internship opportunities.
        </p>

        <div style={ctaRow}>
          <a style={btnDark} href={LINKS.email}>
            soham.jindal16@gmail.com
          </a>
          <a style={btnOutlineOnGlass} href={LINKS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <Link style={btnOutlineOnGlass} to="/resume">
            Resume
          </Link>
          <Link style={btnOutlineOnGlass} to="/cover-letter">
            Cover Letter
          </Link>
        </div>
      </section>

      <footer style={footerOnDark}>© {new Date().getFullYear()} Soham Jindal</footer>
    </main>
  );
}

function PdfPage({ title, pdfUrl }) {
  return (
    <main style={content}>
      <section style={section}>
        <SectionTitle title={title} />

        <div style={ctaRow}>
          <a style={btnDark} href={pdfUrl} target="_blank" rel="noreferrer">
            Open PDF
          </a>
          <a style={btnOutlineOnGlass} href={pdfUrl} download>
            Download
          </a>
        </div>

        <div style={{ marginTop: 16, ...pdfFrameWrap }}>
          <iframe title={title} src={pdfUrl} style={pdfFrame} />
        </div>
      </section>

      <footer style={footerOnDark}>© {new Date().getFullYear()} Soham Jindal</footer>
    </main>
  );
}

function SectionTitle({ title }) {
  return (
    <div style={sectionTitleRow}>
      <div style={sectionTitleOnDark}>{title}</div>
      <div style={ruleOnDark} />
    </div>
  );
}

/* ===========================
   STYLES
   =========================== */

const page = { minHeight: "100vh", color: "white" };

const bg = {
  position: "fixed",
  inset: 0,
  zIndex: -2,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const bgOverlay = {
  position: "fixed",
  inset: 0,
  zIndex: -1,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.62) 100%)",
};

const navWrap = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  width: "100%",
  background: "rgba(0,0,0,0.25)",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid rgba(255,255,255,0.12)",
};

const navInner = {
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
  padding: "18px 22px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
};

const brand = {
  letterSpacing: 4,
  fontSize: 12,
  fontWeight: 900,
  color: "rgba(255,255,255,0.92)",
  textDecoration: "none",
};

const navLinks = { display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "flex-end" };

const navA = {
  color: "rgba(255,255,255,0.86)",
  fontSize: 12,
  letterSpacing: 2,
  textTransform: "uppercase",
};

const hero = { height: "100vh", minHeight: 650, display: "flex", alignItems: "center" };
const heroInner = { maxWidth: 1200, margin: "0 auto", padding: "0 22px" };
const heroKicker = { letterSpacing: 3, fontSize: 12, opacity: 0.9, fontWeight: 900 };
const heroTitle = { margin: "12px 0 0 0", fontSize: 60, letterSpacing: -1, lineHeight: 1.02, maxWidth: 980 };
const heroSub = { marginTop: 16, fontSize: 18, opacity: 0.9, lineHeight: 1.7, maxWidth: 820 };
const scrollHint = { marginTop: 18, color: "rgba(255,255,255,0.75)", fontSize: 14 };

const content = { paddingBottom: 80 };
const section = { maxWidth: 1200, margin: "0 auto", padding: "56px 22px" };

const sectionTitleRow = { display: "flex", alignItems: "center", gap: 16, marginBottom: 18 };
const sectionTitleOnDark = { fontSize: 12, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase" };
const ruleOnDark = { flex: 1, height: 1, background: "rgba(255,255,255,0.18)" };

const twoCol = { display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 16 };

const glassPanel = {
  borderRadius: 18,
  padding: 18,
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.16)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
  backdropFilter: "blur(12px)",
};

const aboutTop = { display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" };

const avatar = {
  width: 84,
  height: 112,
  borderRadius: 14,
  objectFit: "cover",
  objectPosition: "center 20%",
  border: "1px solid rgba(255,255,255,0.20)",
};

const meta = { fontSize: 12, color: "rgba(255,255,255,0.75)" };
const hName = { marginTop: 6, fontSize: 26, fontWeight: 950, letterSpacing: -0.3 };
const meta2 = { marginTop: 6, color: "rgba(255,255,255,0.70)" };

const textOnDark = { marginTop: 14, marginBottom: 0, lineHeight: 1.7, color: "rgba(255,255,255,0.90)" };
const subtleOnDark = { marginTop: 0, marginBottom: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.7 };

const ctaRow = { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 };

const btnLightOnDarkPrimary = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.95)",
  color: "#0b0d12",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: 14,
};

const btnLightOnDark = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.14)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.22)",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: 14,
};

const btnDark = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.95)",
  color: "#0b0d12",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: 14,
};

const btnOutlineOnGlass = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.10)",
  color: "rgba(255,255,255,0.92)",
  border: "1px solid rgba(255,255,255,0.18)",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: 14,
};

const smallHeadOnDark = {
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: 2,
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.90)",
};

const pillRow = { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 };
const pillOnGlass = {
  fontSize: 12,
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.18)",
  color: "rgba(255,255,255,0.90)",
  background: "rgba(255,255,255,0.10)",
};

const accordion = { display: "grid", gap: 12 };

const accItemGlass = {
  width: "100%",
  textAlign: "left",
  borderRadius: 16,
  padding: 16,
  cursor: "pointer",
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.16)",
  backdropFilter: "blur(12px)",
  color: "white",
};

const accItemGlassOpen = { boxShadow: "0 18px 60px rgba(0,0,0,0.35)" };

const accTop = { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 };
const accTitleOnDark = { fontSize: 16, fontWeight: 950 };
const accOneOnDark = { marginTop: 6, color: "rgba(255,255,255,0.78)", lineHeight: 1.6 };
const accChevronOnDark = { fontSize: 22, fontWeight: 950, color: "rgba(255,255,255,0.90)" };

const accBody = { marginTop: 14 };

const listOnDark = {
  marginTop: 10,
  marginBottom: 0,
  paddingLeft: 18,
  color: "rgba(255,255,255,0.88)",
  lineHeight: 1.7,
};

const impactBox = {
  marginTop: 8,
  padding: 12,
  borderRadius: 14,
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.16)",
  color: "rgba(255,255,255,0.90)",
  lineHeight: 1.55,
};

const twoMiniCols = {
  marginTop: 12,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const whatIDoGrid = {
  marginTop: 12,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
};

const miniCard = {
  padding: 12,
  borderRadius: 14,
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.16)",
};

const miniTitle = { fontWeight: 900, marginBottom: 6 };
const miniText = { color: "rgba(255,255,255,0.86)", lineHeight: 1.55, fontSize: 14 };

const statGrid = {
  marginTop: 10,
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 10,
};

const statTile = {
  padding: 12,
  borderRadius: 14,
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.16)",
};

const statLabel = { fontSize: 12, color: "rgba(255,255,255,0.75)" };
const statValue = { marginTop: 6, fontWeight: 900, lineHeight: 1.35 };

const hobbyGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 };
const glassCard = {
  borderRadius: 16,
  padding: 16,
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.16)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.28)",
  backdropFilter: "blur(12px)",
};

const hobbyTitleOnDark = { fontSize: 15, fontWeight: 950 };
const hobbyDescOnDark = { marginTop: 8, color: "rgba(255,255,255,0.78)", lineHeight: 1.7 };

const pdfFrameWrap = {
  borderRadius: 16,
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(255,255,255,0.08)",
};

const pdfFrame = { width: "100%", height: "78vh", border: "none" };

const footerOnDark = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "18px 22px 60px",
  color: "rgba(255,255,255,0.65)",
  fontSize: 13,
};
