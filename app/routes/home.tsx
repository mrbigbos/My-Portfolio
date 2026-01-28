import type { Route } from "./+types/home";
import { Link } from "react-router";
import { ArrowRight, Download } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { Button } from "~/components/ui/button/button";
import { projects, siteSettings } from "~/data/portfolio";
import styles from "./home.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: siteSettings.metaTitle },
    { name: "description", content: siteSettings.metaDescription },
    { property: "og:title", content: siteSettings.metaTitle },
    { property: "og:description", content: siteSettings.metaDescription },
    { property: "og:image", content: siteSettings.ogImage },
  ];
}

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className={styles.page}>
      <Navigation />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1>Hi, I'm {siteSettings.siteName}</h1>
            <p className={styles.tagline}>{siteSettings.tagline}</p>
            <p>{siteSettings.bio}</p>
            <div className={styles.heroActions}>
              <Button asChild size="lg">
                <Link to="/projects">
                  View My Work <ArrowRight size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Get In Touch</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href={siteSettings.cvUrl} download>
                  <Download size={20} /> Download CV
                </a>
              </Button>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.heroImagePlaceholder}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop"
                alt="Developer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Featured Projects</h2>
            <p>A selection of my recent work showcasing various technologies and problem-solving approaches</p>
          </div>
          <div className={styles.projectsGrid}>
            {featuredProjects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id} className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <img src={project.image} alt={project.title} />
                </div>
                <div className={styles.projectContent}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className={styles.projectTech}>
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>By The Numbers</h2>
          </div>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <div className={styles.number}>5+</div>
              <div className={styles.label}>Years Experience</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.number}>{projects.length}</div>
              <div className={styles.label}>Projects Completed</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.number}>50+</div>
              <div className={styles.label}>Happy Clients</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.number}>100%</div>
              <div className={styles.label}>Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
