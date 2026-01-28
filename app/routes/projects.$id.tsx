import type { Route } from "./+types/projects.$id";
import { Link, useParams } from "react-router";
import { ArrowLeft, ExternalLink, Github, Calendar, FolderOpen } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { Button } from "~/components/ui/button/button";
import { projects, siteSettings } from "~/data/portfolio";
import styles from "./projects.$id.module.css";

export function meta({ params }: Route.MetaArgs) {
  const project = projects.find((p) => p.id === params.id);
  return [
    { title: `${project?.title || "Project"} - ${siteSettings.siteName}` },
    { name: "description", content: project?.description || "" },
  ];
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className={styles.page}>
        <Navigation />
        <div className={styles.section}>
          <div className={styles.container}>
            <h1>Project not found</h1>
            <Link to="/projects">Back to Projects</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navigation />

      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <Link to="/projects" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <div className={styles.heroContent}>
            <h1>{project.title}</h1>
            <div className={styles.projectMeta}>
              <div className={styles.metaItem}>
                <FolderOpen size={16} />
                <span>{project.category}</span>
              </div>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>
                  {new Date(project.completedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
              </div>
            </div>
            <div className={styles.heroActions}>
              {project.liveUrl && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} /> View Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={16} /> View Source Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.gallery}>
            {project.gallery.map((image, index) => (
              <div key={index} className={styles.galleryImage}>
                <img src={image} alt={`${project.title} screenshot ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className={styles.content}>
            <div className={styles.mainContent}>
              <h2>About This Project</h2>
              <p>{project.longDescription}</p>
            </div>

            <div className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <h3>Technologies Used</h3>
                <div className={styles.techStack}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Project Details</h3>
                <div className={styles.projectInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Category</span>
                    <span className={styles.infoValue}>{project.category}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Completed</span>
                    <span className={styles.infoValue}>
                      {new Date(project.completedDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                  {project.featured && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Status</span>
                      <span className={styles.infoValue}>Featured</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
