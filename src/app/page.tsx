import { getProjects } from "@/lib/notion";
import { ExternalLink, ArrowUpRight, Github, Mail } from "lucide-react";
import Image from "next/image";

export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="container wrapper">
      {/* Navbar area */}
      <nav className="navbar">
        <h1 style={{ fontSize: '1.5rem', zIndex: 10 }}>RLUCIO<span className="text-accent">.</span></h1>
        {/* Simple nav links could go here */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero section">
        <div className="hero-bg-glow"></div>
        <div className="hero-content">
          <p className="text-accent" style={{ fontWeight: 600, letterSpacing: '0.1em', marginBottom: '1rem' }}>
            FULL STACK DEVELOPER
          </p>
          <h1 className="display-text">
            Building <br />
            Digital <span className="text-accent">Experiences</span>
          </h1>
          <p className="hero-subtitle">
            I transform ideas into functional, high-performance web applications.
            Specialized in Next.js, React, and Modern UI Design.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn">
              View Work <ArrowUpRight size={20} />
            </a>
            <a href="https://github.com/rlucio01" target="_blank" className="btn btn-outline" rel="noreferrer">
              <Github size={20} /> GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="projects-header">
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Selected Work</h2>
            <p style={{ color: 'var(--text-secondary)' }}>A collection of my best projects turned into reality.</p>
          </div>
          {/* Optional View All Button */}
          {/* <button className="btn btn-outline">View All</button> */}
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="card-image-wrapper">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="card-image"
                    loading="lazy"
                  />
                ) : (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(45deg, #1c1c1c, #2a2a2a)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#444'
                  }}>
                    <span>No Image</span>
                  </div>
                )}
              </div>

              <div className="card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <h3 className="card-title">{project.name}</h3>
                  <a href={project.url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                    <ArrowUpRight size={20} />
                  </a>
                </div>

                <p className="card-desc">
                  {project.description}
                </p>

                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact / Footer Section */}
      <footer id="contact">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Let's work together</h2>
          <p style={{ marginBottom: '2rem' }}>
            Have a project in mind? Feel free to reach out.
          </p>
          <a href="mailto:rlucio01@gmail.com" className="btn">
            <Mail size={18} /> Get in touch
          </a>

          <div style={{ marginTop: '4rem', fontSize: '0.875rem', color: '#555' }}>
            <p>&copy; {new Date().getFullYear()} RLucio. Built with Next.js & Notion.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
