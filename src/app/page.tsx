import { getProjects } from "@/lib/notion";
import { ExternalLink } from "lucide-react";

// Revalidate every 60 seconds (ISR) to keep portfolio fresh
export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="container">
      <header style={{ textAlign: "center", padding: "4rem 0" }}>
        <h1 className="title">My Portfolio</h1>
        <p className="subtitle" style={{ margin: "0 auto" }}>
          Explore my latest work and side projects. Managed in Notion, deployed automatically.
        </p>
      </header>

      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.id} className="card">
            <div className="card-image-wrap">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="card-image"
                  loading="lazy"
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(45deg, #1e293b, #0f172a)',
                  color: '#94a3b8',
                  fontSize: '0.875rem'
                }}>
                  <span>No Preview</span>
                </div>
              )}
            </div>

            <div className="card-content">
              <h2 className="card-title">{project.name}</h2>

              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="card-desc">
                {project.description}
              </p>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                View Project <ExternalLink size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
