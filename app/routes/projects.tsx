import type { Route } from "./+types/projects";
import { useState } from "react";
import { Link } from "react-router";
import { ExternalLink, Github, Star } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { projects, siteSettings, PROJECT_CATEGORIES } from "~/data/portfolio";
import styles from "./projects.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Projects - ${siteSettings.siteName}` },
    { name: "description", content: "Explore my portfolio of web development projects and technical solutions." },
  ];
}

export default function Projects() {
  const categories = ["All Projects", ...PROJECT_CATEGORIES];
  const [selectedCategory, setSelectedCategory] = useState("All Projects");

  const filteredProjects =
    selectedCategory === "All Projects" ? projects : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className={styles.page}>
      <Navigation />

      <section className={styles.hero}>
        <h1>My Projects</h1>
        <p>A showcase of my work across various technologies and domains</p>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.filters}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredProjects.length > 0 ? (
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project) => (
                <Link to={`/projects/${project.id}`} key={project.id} className={styles.projectCard}>
                  <div className={styles.projectImage}>
                    <img src={project.image} alt={project.title} />
                    {project.featured && (
                      <div className={styles.featuredBadge}>
                        <Star size={12} /> Featured
                      </div>
                    )}
                  </div>
                  <div className={styles.projectContent}>
                    <div className={styles.projectHeader}>
                      <h3>{project.title}</h3>
                      <div className={styles.projectCategory}>{project.category}</div>
                    </div>
                    <p className={styles.projectDescription}>{project.description}</p>
                    <div className={styles.projectTech}>
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span key={tech} className={styles.techBadge}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className={styles.projectLinks}>
                      {project.liveUrl && (
                        <span className={styles.projectLink}>
                          <ExternalLink size={14} /> Live Demo
                        </span>
                      )}
                      {project.githubUrl && (
                        <span className={styles.projectLink}>
                          <Github size={14} /> Source Code
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>No projects found</h3>
              <p>Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
