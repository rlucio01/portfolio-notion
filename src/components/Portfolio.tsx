"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Mail, Globe, Code, MessageSquare } from "lucide-react";
import { Project } from "@/lib/notion";

type Language = "en" | "pt";

const translations = {
    en: {
        nav: {
            projects: "Projects",
            contact: "Contact",
        },
        hero: {
            role: "FULL STACK DEVELOPER",
            title: "Building",
            title2: "Digital",
            titleSpan: "Experiences",
            subtitle:
                "I transform ideas into functional, high-performance web applications. Specialized in Next.js, React, and Modern UI Design.",
            btnWork: "View Work",
            btnGithub: "GitHub",
        },
        projects: {
            title: "Selected Work",
            subtitle: "A collection of my best projects turned into reality.",
            noImage: "No Image",
        },
        contact: {
            title: "Let's work together",
            desc: "Have a project in mind? Feel free to reach out.",
            btn: "Get in touch",
            whatsapp: "Hello! I saw your portfolio and would like to talk about a project.",
            copyright: "RLucio. Built with Next.js & Notion.",
        },
    },
    pt: {
        nav: {
            projects: "Projetos",
            contact: "Contato",
        },
        hero: {
            role: "DESENVOLVEDOR FULL STACK",
            title: "Criando",
            title2: "Experiências",
            titleSpan: "Digitais",
            subtitle:
                "Transformo ideias em aplicações web funcionais e de alta performance. Especializado em Next.js, React e UI Design Moderno.",
            btnWork: "Ver Projetos",
            btnGithub: "GitHub",
        },
        projects: {
            title: "Trabalhos Selecionados",
            subtitle: "Uma coleção dos meus melhores projetos transformados em realidade.",
            noImage: "Sem Imagem",
        },
        contact: {
            title: "Vamos trabalhar juntos",
            desc: "Tem um projeto em mente? Entre em contato.",
            btn: "Fale comigo",
            whatsapp: "Olá! Vi seu portfólio e gostaria de conversar sobre um projeto.",
            copyright: "RLucio. Feito com Next.js & Notion.",
        },
    },
};

export default function Portfolio({ projects }: { projects: Project[] }) {
    const [lang, setLang] = useState<Language>("en");
    const t = translations[lang];

    return (
        <main className="container wrapper">
            {/* Navbar area */}
            <nav className="navbar">
                <h1 style={{ fontSize: "1.5rem", zIndex: 10 }}>
                    RLUCIO<span className="text-accent">.</span>
                </h1>

                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                    <a href="#projects" className="nav-link">
                        {t.nav.projects}
                    </a>
                    <a href="#contact" className="nav-link">
                        {t.nav.contact}
                    </a>

                    <button
                        onClick={() => setLang(lang === "en" ? "pt" : "en")}
                        className="btn-outline"
                        style={{
                            padding: "0.5rem",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "transparent",
                            border: "1px solid var(--border)",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                        }}
                        title={lang === "en" ? "Mudar para Português" : "Switch to English"}
                    >
                        <Globe size={18} />
                        <span style={{ marginLeft: "0.5rem", fontSize: "0.8rem", fontWeight: 600 }}>
                            {lang === "en" ? "PT" : "EN"}
                        </span>
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero section">
                <div className="hero-bg-glow"></div>
                <div className="hero-content">
                    <p className="text-accent" style={{ fontWeight: 600, letterSpacing: "0.1em", marginBottom: "1rem" }}>
                        {t.hero.role}
                    </p>
                    <h1 className="display-text">
                        {t.hero.title} <br />
                        {t.hero.title2} <span className="text-accent">{t.hero.titleSpan}</span>
                    </h1>
                    <p className="hero-subtitle">
                        {t.hero.subtitle}
                    </p>

                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <a href="#projects" className="btn">
                            {t.hero.btnWork} <ArrowUpRight size={20} />
                        </a>
                        <a href="https://github.com/rlucio01" target="_blank" className="btn btn-outline" rel="noreferrer">
                            <Github size={20} /> {t.hero.btnGithub}
                        </a>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="section">
                <div className="projects-header">
                    <div>
                        <h2 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{t.projects.title}</h2>
                        <p style={{ color: "var(--text-secondary)" }}>{t.projects.subtitle}</p>
                    </div>
                </div>

                <div className="project-grid">
                    {projects.map((project) => {
                        const isExternal = project.url && project.url !== "#";
                        return (
                            <article key={project.id} className="project-card">
                                <a
                                    href={project.url}
                                    target={isExternal ? "_blank" : undefined}
                                    rel="noreferrer"
                                    className="project-card-link-wrapper"
                                    style={{ display: "flex", flexDirection: "column", height: "100%", color: "inherit", textDecoration: "none" }}
                                >
                                    <div className="card-image-wrapper">
                                        {project.image ? (
                                            <Image
                                                src={project.image}
                                                alt={project.name}
                                                className="card-image"
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                style={{ objectFit: "cover" }}
                                                quality={85}
                                            />
                                        ) : (
                                            <>
                                                <Image
                                                    src="/placeholder.png"
                                                    alt={project.name}
                                                    className="card-image"
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    style={{ objectFit: "cover", opacity: 0.5 }}
                                                    quality={85}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        background: "rgba(0,0,0,0.2)",
                                                    }}
                                                >
                                                    <Code size={48} style={{ opacity: 0.3, color: "var(--text-primary)" }} />
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="card-content">
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                            <h3 className="card-title">{project.name}</h3>
                                            {isExternal && (
                                                <span style={{ color: "var(--text-secondary)" }}>
                                                    <ArrowUpRight size={20} />
                                                </span>
                                            )}
                                        </div>

                                        <p className="card-desc">{project.description}</p>

                                        <div className="tags">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            </article>
                        );
                    })}
                </div>

            </section>

            {/* Contact / Footer Section */}
            <footer id="contact">
                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--text-primary)" }}>
                        {t.contact.title}
                    </h2>
                    <p style={{ marginBottom: "2rem" }}>{t.contact.desc}</p>
                    <a
                        href={`https://wa.me/5521993962050?text=${encodeURIComponent(t.contact.whatsapp)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn"
                    >
                        <MessageSquare size={18} /> {t.contact.btn}
                    </a>

                    <div style={{ marginTop: "4rem", fontSize: "0.875rem", color: "#555" }}>
                        <p>&copy; {new Date().getFullYear()} {t.contact.copyright}</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
