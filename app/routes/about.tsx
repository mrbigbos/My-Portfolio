import type { Route } from "./+types/about";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { skills, experience, education, siteSettings } from "~/data/portfolio";
import styles from "./about.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: `About - ${siteSettings.siteName}` }, { name: "description", content: siteSettings.fullBio }];
}

export default function About() {
  const skillCategories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className={styles.page}>
      <Navigation />

      <section className={styles.hero}>
        <h1>About Me</h1>
        <p>Learn more about my journey, skills, and experience</p>
      </section>

      {/* Bio Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.bioSection}>
            <div className={styles.profileImage}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop"
                alt={siteSettings.siteName}
              />
            </div>
            <div className={styles.bioContent}>
              <h2>Hello, I'm {siteSettings.siteName}</h2>
              <p>{siteSettings.fullBio}</p>
              <p>
                Throughout my career, I've had the privilege of working with diverse teams and clients, from startups to
                established enterprises. I believe in writing clean, maintainable code and creating user experiences
                that delight and empower users.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
                sharing knowledge through technical writing and mentoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={`${styles.section} ${styles.skillsSection}`}>
        <div className={styles.container}>
          <h2>Skills & Expertise</h2>
          <div className={styles.skillsGrid}>
            {skillCategories.map((category) => (
              <div key={category} className={styles.skillCategory}>
                <h3>{category}</h3>
                <div className={styles.skillsList}>
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <div key={skill.id} className={styles.skillItem}>
                        <div className={styles.skillHeader}>
                          <span className={styles.skillName}>{skill.name}</span>
                          <span className={styles.skillLevel}>{skill.level}%</span>
                        </div>
                        <div className={styles.skillBar}>
                          <div className={styles.skillProgress} style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.timelineSection}>
            <h2>Work Experience</h2>
            <div className={styles.timeline}>
              {experience.map((exp) => (
                <div key={exp.id} className={`${styles.timelineItem} ${exp.current ? styles.current : ""}`}>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <div className={styles.timelineTitle}>
                        <h3>
                          {exp.title}
                          {exp.current && <span className={styles.currentBadge}>Current</span>}
                        </h3>
                        <p className={styles.timelineCompany}>{exp.company}</p>
                        <p className={styles.timelineLocation}>{exp.location}</p>
                      </div>
                      <div className={styles.timelineDate}>
                        {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} -{" "}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                          : "Present"}
                      </div>
                    </div>
                    <p className={styles.timelineDescription}>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className={`${styles.section} ${styles.skillsSection}`}>
        <div className={styles.container}>
          <div className={styles.timelineSection}>
            <h2>Education</h2>
            <div className={styles.timeline}>
              {education.map((edu) => (
                <div key={edu.id} className={styles.timelineItem}>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <div className={styles.timelineTitle}>
                        <h3>{edu.degree}</h3>
                        <p className={styles.timelineCompany}>{edu.institution}</p>
                        <p className={styles.timelineLocation}>{edu.location}</p>
                      </div>
                      <div className={styles.timelineDate}>
                        {new Date(edu.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} -{" "}
                        {new Date(edu.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </div>
                    </div>
                    <p className={styles.timelineDescription}>{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
