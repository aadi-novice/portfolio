import { Link } from 'react-router-dom';

// From the resume (Aditya_Ambade_Resume_AI_v2), in its own words.
const experience = [
  {
    role: 'AI Automation Engineer Executive',
    where: 'Automated Softtech Technology, GIFT City. Client: DocuGulf, UAE',
    when: '08/2026 to present',
    line: 'Rebuilt Noor, the website and WhatsApp AI chatbot that generates service quotations, as a TypeScript service on Railway. Co-built Oryx, the in-house CRM: 350+ FastAPI routes.',
  },
  {
    role: 'AI/ML Developer',
    where: 'NeuralVedaX, Vadodara',
    when: '02/2026 to 07/2026',
    line: 'Built a 35,000-edge knowledge graph from 8,000+ documents, and hybrid BM25 + FAISS retrieval over 2,000+ regulatory licenses.',
  },
  {
    role: 'Agentic AI Developer',
    where: 'Techmero, Vadodara',
    when: '06/2025 to 08/2025',
    line: 'Async Python backend (JWT) for 50+ concurrent users; n8n + OpenAI automation cut publishing time by 60%.',
  },
];

const stack = [
  { title: 'AI and LLMs', items: 'RAG, hybrid search, reranking, structured outputs, agent orchestration (PydanticAI, LangChain), vision LLMs, evaluation, FAISS, pgvector, PyTorch' },
  { title: 'Backend and data', items: 'FastAPI, Django, Node.js (Fastify), Celery, Redis, multi-tenancy, RBAC, SSO, PostgreSQL, Neo4j, MongoDB' },
  { title: 'Integrations', items: 'OpenRouter, n8n, Chatwoot, WhatsApp, Frappe CRM, Greenhouse API, React, Next.js' },
  { title: 'Delivery', items: 'Docker, GitHub Actions, Railway, Azure, blue-green deployments, pytest, token, cost and latency logging' },
  { title: 'Languages', items: 'Python, TypeScript, SQL, Go, Dart' },
];

const tools = [
  { label: 'Editor', value: 'Neovim (configured)' },
  { label: 'OS', value: 'Arch Linux / macOS' },
  { label: 'Hardware', value: 'M3 Max / HHKB Hybrid' },
];

const learning = [
  { title: 'B.Tech, Computer Science Engineering', where: 'ITM SLS Baroda University, CGPA 8.34', when: '2022 to 2026' },
  { title: 'AWS Cloud Practitioner', where: 'Udacity', when: '2026' },
  { title: 'Neo4j & Cypher Fundamentals', where: 'Neo4j', when: '2026' },
  { title: 'Google 5-Day Gen AI Intensive', where: 'Google', when: '2025' },
  { title: 'HackerRank SWE Intern, GTU Ventures Incubation (RESNET), McKinsey Forward', where: 'Certifications and programmes', when: '2025' },
];

export default function About() {
  return (
    <>
      {/* Hero: Stage, the portrait beside the claim */}
      <section className="container grid12 stage" aria-labelledby="about-title">
        <div className="stage__text">
          <h1 id="about-title">AI engineer, applied and forward deployed.</h1>
          <p className="lead">I build production LLM systems and the backends around them.</p>
          <Link to="/contact" className="btn">Start a project</Link>
        </div>
        <figure className="stage__figure">
          <div className="photo photo--45">
            <img
              src="https://i.postimg.cc/Y9zfYHF1/me.jpg"
              alt="Illustrated portrait of Aditya Ambade"
              width={900}
              height={1125}
              fetchPriority="high"
              referrerPolicy="no-referrer"
            />
          </div>
        </figure>
      </section>

      {/* The story, as a statement */}
      <section className="section" aria-labelledby="story-title">
        <div className="container">
          <div className="opens">
            <h2 id="story-title">The story</h2>
            <p className="standfirst" style={{ marginTop: 'var(--space-2xl)', maxWidth: '36ch' }}>
              At DocuGulf, a UAE legal-tech company, I rebuilt the customer-facing AI chatbot with schema-constrained LLM calls and deterministic pricing.
            </p>
            <dl className="pair">
              <div>
                <dt>Philosophy</dt>
                <dd>Precision is the only luxury. I believe in code that is as clean as the aesthetic is aggressive.</dd>
              </div>
              <div>
                <dt>Mission</dt>
                <dd>To eliminate the “template” web. Every project is a unique cryptographic signature.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Experience, as rows */}
      <section className="section--s" aria-labelledby="experience-title">
        <div className="container">
          <div className="head-block">
            <h2 id="experience-title">Experience</h2>
          </div>
          <ol className="rows">
            {experience.map((job) => (
              <li key={job.role}>
                <div className="row-head">
                  <h3>{job.role}</h3>
                  <p className="meta">{job.where}</p>
                  <p className="meta">{job.when}</p>
                </div>
                <p>{job.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stack, as rows */}
      <section className="section--s" aria-labelledby="stack-title">
        <div className="container">
          <div className="head-block">
            <h2 id="stack-title">Tech stack</h2>
          </div>
          <dl className="rows">
            {stack.map((row) => (
              <div key={row.title}>
                <dt>{row.title}</dt>
                <dd>{row.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Tools, as a spec sheet on the ink band */}
      <section className="section band--ink" aria-labelledby="tools-title">
        <div className="container grid12 tools">
          <div className="tools__head">
            <h2 id="tools-title">The tools</h2>
            <p>Every masterpiece requires the right instrument. My daily workflow is optimized for speed, reliability, and cryptographic security.</p>
          </div>
          <table className="tools__table">
            <caption className="visually-hidden">Daily tools</caption>
            <tbody>
              {tools.map((t) => (
                <tr key={t.label}>
                  <th scope="row">{t.label}</th>
                  <td>{t.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Education and certifications */}
      <section className="section" aria-labelledby="learning-title">
        <div className="container">
          <div className="head-block">
            <h2 id="learning-title">Education and certifications</h2>
          </div>
          <ul className="rows">
            {learning.map((item) => (
              <li key={item.title}>
                <div className="row-head">
                  <h3>{item.title}</h3>
                </div>
                <p>{item.where}<span className="meta" style={{ marginLeft: 'var(--space-md)' }}>{item.when}</span></p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Close */}
      <section className="section band--well" aria-labelledby="collab-title">
        <div className="container grid12 collab">
          <div>
            <h2 id="collab-title">Want to collab?</h2>
            <p>Based in India, open to relocation or remote.</p>
            <ul>
              <li><Link to="/contact" className="link">Start a project</Link></li>
              <li><a className="link" href="https://github.com/aadi-novice">GitHub</a></li>
              <li><a className="link" href="https://www.linkedin.com/in/ambadeaditya">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
